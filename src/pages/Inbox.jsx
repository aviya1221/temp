import { useEffect, useState, useRef } from "react";
import {searchInboxByFrom,subscribeInbox} from "../api/mailApi";
import { Card, Container,Modal,Spinner,InputGroup,Form, Button } from "react-bootstrap";
import dayjs from 'dayjs';
import ReactMarkdown from "react-markdown";


export default function Inbox() {
  const [items, setItems] = useState(null);
  const [clicked,setClicked]=useState(false);
  const [message,setMessage]= useState(null);
  const [input,setInput]= useState("");
  const [summary,setSummary]= useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const summaryRef = useRef(null);

  const AiSummary= async(body)=>{
    setIsSummarizing(true);
    setSummary("");
    try {
      const res= await fetch ('/.netlify/functions/summarizeEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({prompt:body})
      });
      if(!res.ok) throw new Error('Request failed');
      const data= await res.json();
      setSummary(data.output);
    } catch (e) {
      setSummary('Could not summarize this email.');
    } finally {
      setIsSummarizing(false);
    }
  }

  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [summary]);

  useEffect(() => {
    let unsub;
    let cancelled = false;
    const term = input.trim();

    const runSearch = async () => {
      try {
        const results = await searchInboxByFrom(term);
        if (!cancelled) setItems(results);
      } catch (e) {
        if (!cancelled) setItems([]);
      }
    };

    const runSubscribe = () => {
      try {
        unsub = subscribeInbox(arr => {
          if (!cancelled) setItems(arr);
        });
      } catch {
        if (!cancelled) setItems([]);
      }
    };
    const timer = setTimeout(() => {
      if (term.length > 2) {
        runSearch();
      } else {
        runSubscribe();
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (unsub) unsub();
    };
  }, [input]);

  if (items === null) return (<div><Spinner></Spinner><br/>Loading…</div>);


  return (
    <Container className="mail-cardCont d-flex flex-column gap-3">
        <InputGroup className="mail-search-group mb-3">
        <Form.Control
          className="mail-search-input"
          type="text"
          placeholder="Search sender email…"
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Search sent mail"
        />
      </InputGroup>

      {items.length===0 &&
      <p className="mail-empty-message text-center fw-semibold">
        <span className="mail-empty-icon" aria-label="No mail" role="img">📭</span>
     
        <h1>Sorry</h1>
        No incoming mail found
      </p>}

      {items.map(m => (
        <Card className="mail-card" key={m.id}
        onClick={()=>{ setClicked(true); setMessage(m)}}
        dir="auto">
        <b className="mail-headers" dir="auto">{m.subject || "(No subject)"} </b>
        <div className="mail-headers"  dir="auto">from: {m.from}<br/></div>
          <Container className="mail-headers mt-2">{m.body}<br/> </Container>
          <small className="mail-card-date text-end ms-auto">
            {dayjs(m.createdAt.toDate()).format("HH:mm DD/MM/YYYY")}
          </small>
        </Card>
      ))}
      
      {message&&clicked&&(
        <Modal
          show={clicked}
          onHide={() => {
            setClicked(false);
            setSummary("");
          }}
          centered
          scrollable
          contentClassName="sent-modal-content">
          <Modal.Header closeButton className="sent-modal-header">
            <Modal.Title>
              <span className="sent-modal-title">{message.subject || "(No subject)"}</span>
              <div className="sent-modal-address">From: {message.from}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="sent-modal-body" dir="auto">
            {message.body}
            {isSummarizing && (
              <div className="mt-3 text-center">
                <Spinner animation="border" size="sm" /> Summarizing...
              </div>
            )}
            {summary && (
              <div className="mt-3" ref={summaryRef}>
                <hr />
                <strong>AI Summary:</strong>
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className=" d-flex justify-content-between sent-modal-footer">
            <Button onClick={() => AiSummary(message.body)} disabled={isSummarizing}>
              {isSummarizing ? "Summarizing..." : "Summarize it"}
            </Button>
            <span>{dayjs(message.createdAt.toDate()).format('DD/MM/YYYY HH:mm')}</span>
          </Modal.Footer>
        </Modal>)}
    </Container>
  );
}
