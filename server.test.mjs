import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const port=34567;
test('gateway requires bearer auth and validates file input',async()=>{
 const child=spawn(process.execPath,['server.mjs'],{env:{...globalThis.process.env,PORT:String(port),GEMINI_API_KEY:'test_not_real',SPLIIT_GATEWAY_TOKEN:'local_test_token_very_long'},stdio:'ignore'});
 try{
  let active=false;
  for(let i=0;i<40;i++){
   try{const r=await fetch('http://127.0.0.1:'+port+'/health');if(r.status===200){active=true;break}}catch{}
   await new Promise(r=>setTimeout(r,80));
  }
  assert.equal(active,true,'health');
  const unauthed=await fetch('http://127.0.0.1:'+port+'/v1/analyze',{method:'POST'});
  assert.equal(unauthed.status,401);
  const tooSmall=await fetch('http://127.0.0.1:'+port+'/v1/analyze',{method:'POST',headers:{Authorization:'Bearer local_test_token_very_long','Content-Type':'application/json'},body:JSON.stringify({kind:'receipt',mimeType:'image/jpeg',data:'bad'})});
  assert.equal(tooSmall.status,400);
  const unknown=await fetch('http://127.0.0.1:'+port+'/unknown');
  assert.equal(unknown.status,404);
 } finally {child.kill();}
});