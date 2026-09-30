import { auth, functions, HOGASAFETY_TRAINING_TENANT_ID } from './firebase-config.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { httpsCallable } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js';

const $=s=>document.querySelector(s);
const loading=$('#loading'),login=$('#loginView'),app=$('#appView'),dashboard=$('#dashboard'),loginError=$('#loginError'),accessError=$('#accessError');
const bootstrap=httpsCallable(functions,'getHogaSafetyTrainingBootstrap');
function busy(v){loading.hidden=!v}
function showError(el,msg){el.textContent=msg;el.hidden=false}
function friendly(e){const m=String(e?.message||''); if(m.includes('auth/invalid-credential'))return 'E-Mail-Adresse oder Passwort ist nicht korrekt.'; if(m.includes('auth/too-many-requests'))return 'Zu viele Anmeldeversuche. Bitte später erneut versuchen.'; return m.replace(/^Firebase:\s*/,'')||'Ein unbekannter Fehler ist aufgetreten.'}
$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();loginError.hidden=true;busy(true);try{
 if(HOGASAFETY_TRAINING_TENANT_ID.startsWith('HIER_')) throw new Error('Der HOGAsafety Identity-Platform-Tenant ist noch nicht konfiguriert.');
 await signInWithEmailAndPassword(auth,$('#email').value.trim(),$('#password').value);
}catch(err){showError(loginError,friendly(err));busy(false)}});
$('#logoutBtn').addEventListener('click',()=>signOut(auth));
onAuthStateChanged(auth,async user=>{if(!user){busy(false);app.hidden=true;login.hidden=false;dashboard.hidden=true;return}
 busy(true);login.hidden=true;app.hidden=false;accessError.hidden=true;dashboard.hidden=true;
 try{const result=await bootstrap();const d=result.data||{};document.querySelector('[data-user]').textContent=d.displayName||user.email||'Benutzer';document.querySelector('[data-company]').textContent=d.customerName||'Ihr Unternehmen';document.querySelector('[data-role]').textContent=d.roleLabel||d.role||'Benutzer';
 document.querySelector('[data-manager-card]').hidden=!['supervisor','customer_admin'].includes(d.role);
 document.querySelector('[data-admin-card]').hidden=d.role!=='customer_admin';
 dashboard.hidden=false;
 }catch(err){console.error(err);showError(accessError,friendly(err))}
 busy(false);
});
