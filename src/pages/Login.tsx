import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { handleFirestoreError, OperationType } from '../lib/errorUtils';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists
      const userRef = doc(db, 'users', user.uid);
      let userSnap;
      try {
        userSnap = await getDoc(userRef);
      } catch (error) {
        console.warn("Could not fetch user profile (possibly new user or permission issue):", error);
      }

      if (!userSnap?.exists()) {
        // Create a default profile if it's a new user
        const businessId = `biz_${user.uid}`;
        
        // Create business doc
        try {
          await setDoc(doc(db, 'businesses', businessId), {
            name: `${user.displayName}'s Business`,
            ownerId: user.uid,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          console.error("Failed to create business profile:", error);
        }

        // Create user doc
        try {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email || 'no-email@example.com',
            displayName: user.displayName || 'User',
            role: 'OWNER',
            businessId: businessId,
            createdAt: serverTimestamp(),
          });
          console.log("Successfully created user profile");
        } catch (error) {
          console.error("Failed to create user profile:", error);
          // Don't throw here so we can see what goes wrong in console
        }
      }

      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="max-w-md w-full space-y-8 bg-brand-card p-10 rounded-xl shadow-2xl border border-slate-800 text-center">
        <div>
          <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center font-bold text-black text-3xl mx-auto mb-6 shadow-[0_0_20px_rgba(14,165,233,0.3)]">E</div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
            E-Community
          </h2>
          <p className="mt-2 text-sm text-slate-500 uppercase tracking-widest font-semibold">
            Unified Business Management
          </p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-brand-accent hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          Access Platform Core
        </button>
        <p className="text-[10px] text-slate-600 uppercase tracking-tighter">Secure encrypted multi-tenant environment</p>
      </div>
    </div>
  );
}
