import {
  collection, doc, writeBatch, serverTimestamp,
  query,  where, orderBy, getDocs, onSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

export async function sendMail({ mailObj }) {
   const to = mailObj.to;
   const subject =mailObj.title;
   const body =  mailObj.message;
  const auth = getAuth();
  const fromEmail = auth.currentUser?.email;
  if (!fromEmail) throw new Error("You must be signed in.");

  const from = fromEmail.trim().toLowerCase();
  const toNorm = to.trim().toLowerCase();
  if (!toNorm) throw new Error("Recipient email is required.");

  const batch = writeBatch(db);
  const mailId = crypto.randomUUID();

  const base = {
    mailId,
    from,
    to: toNorm,
    subject: subject?.trim() || "",
    body: body ?? "",
    createdAt: serverTimestamp(),
  };

  const sentRef = doc(collection(db, "mailboxes", from, "sent"));
  batch.set(sentRef, base);

  const inboxRef = doc(collection(db, "mailboxes", toNorm, "inbox"));
  batch.set(inboxRef, base);

  await batch.commit();
}


export function subscribeInbox(cb) {
  const auth = getAuth();
  const email = auth.currentUser?.email.trim().toLowerCase();;
  if (!email) throw new Error("You must be signed in.");

  const q = query(
    collection(db, "mailboxes", email, "inbox"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, snap => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export function subscribeSent(cb) {
  const auth = getAuth();
  const email = auth.currentUser?.email.trim().toLowerCase();;
  if (!email) throw new Error("You must be signed in.");

  const q = query(
    collection(db, "mailboxes", email, "sent"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, snap => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}


export async function searchInboxByFrom(fromEmail) {
  const me = getAuth().currentUser?.email?.trim().toLowerCase();
  if (!me) throw new Error("Sign in first");
  const q = query(
    collection(db, "mailboxes", me, "inbox"),
    where("from", "==", fromEmail.trim().toLowerCase()),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function searchSentByTo(toEmail) {
  const me = getAuth().currentUser?.email?.trim().toLowerCase();
  if (!me) throw new Error("Sign in first");
 const term = toEmail.trim().toLowerCase();
const q = query(
  collection(db, "mailboxes", me, "sent"),
  where("to", ">=", term),
  where("to", "<=", term + "\uf8ff"), // גבול עליון לשמירה על prefix
  orderBy("to"),
  orderBy("createdAt", "desc")
);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

