import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";

const globalVar = create((set,get) => ({

showSideBar:false,
openSideBar:()=>set({
    showSideBar:true,

}),
closeSideBar:()=>set({
    showSideBar:false,
}),


user:null,
loading:true,
unsub:null,
userEmail:null,

logout:async ()=>{
  try {
    await signOut(auth);
    localStorage.removeItem("token");
  } catch (error) {
    alert(error.message)
  }
},

initAuthListener: () => {
    if (get().unsub) return;

    const unsub = onAuthStateChanged(auth, (u) => {
      set({ user: u || null, loading: false });
    });

    set({unsub: unsub });
  },
  
cleanup: () => {
    const unsub = get().unsub;
    if (unsub) {
      unsub();
      set({unsub: null });
    }
  },

  setUserEmail:(email)=>{
      set({userEmail:email})
  }

}))

export default globalVar;