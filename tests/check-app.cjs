const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=require('path').resolve(__dirname,'..')+'/',js=fs.readFileSync(root+'app.js','utf8'),raw=fs.readFileSync(root+'data.json','utf8'),db=JSON.parse(raw);
assert.deepStrictEqual(JSON.parse(fs.readFileSync(root+'index.html','utf8').match(/<script id="study-data" type="application\/json">([\s\S]*?)<\/script>/)[1]),db);
async function create(protocol='file:',offline=false,legacy=null){
 const nodes={},events={};let fetches=0,stored;
 const node=s=>nodes[s]??=( {innerHTML:'',textContent:'',value:'',disabled:false,dataset:{}} );
 node('#study-data').textContent=raw;node('#filter').value='alle';node('#written-area').value='alle';
 for(const [key,value] of Object.entries({'#quiz-area':'alle','#quiz-level':'alle','#quiz-mode':'alle','#quiz-length':'10'}))node(key).value=value;
 const context=vm.createContext({document:{querySelector:node,querySelectorAll:()=>[],addEventListener:(name,fn)=>events[name]=fn},location:{protocol},localStorage:{getItem:()=>legacy?JSON.stringify(legacy):null,setItem:(key,v)=>stored=JSON.parse(v)},window:{scrollTo:()=>{}},fetch:async()=>{fetches++;if(offline)throw Error('offline');return{ok:true,json:async()=>db}}});
 vm.runInContext(js,context);await new Promise(r=>setImmediate(r));assert(node('#app').innerHTML.includes(String(db.topics.length)));assert(node('#app').innerHTML.includes(String(db.questions.length)));
 return {context,node,nodes,events,getStored:()=>stored,getFetches:()=>fetches,run:code=>vm.runInContext(code,context)};
}
(async()=>{
 const a=await create('file:',false,{read:['5'],correct:['5']});assert.equal(a.getFetches(),0);assert.deepEqual(a.getStored().correct,['q5']);
 a.run("go('fagstoff')");a.node('#filter').value='spill';a.run('listTopics()');assert(a.node('#topic-count').textContent.startsWith(db.topics.filter(t=>t.area==='spill').length+' '));
 a.node('#search').value='Stackelberg';a.run('listTopics()');assert(a.node('#topics').innerHTML.includes('Stackelberg'));
 a.run("openTopic('g10')");assert(a.node('#app').innerHTML.includes('2/5'));assert(a.node('#app').innerHTML.includes('Øv på dette temaet'));
 a.run("go('quiz')");a.node('#quiz-area').value='spill';a.node('#quiz-level').value='fordypning';a.run('quizCount()');assert(a.node('#quiz-count').textContent.startsWith(db.questions.filter(q=>q.level==='fordypning'&&db.topics.find(t=>t.id===q.topic).area==='spill').length+' '));
 a.run("startQuiz(quizCandidates(),10)");assert(a.node('#app').innerHTML.includes('AV 10'));
 // Exercise every answer and check question IDs, not topic IDs, are tracked.
 a.run('startQuiz(data.questions,data.questions.length)');
 for(let i=0;i<db.questions.length;i++){a.run('answer(session[qi].answer)');a.run('answer(session[qi].answer)');a.run('nextQuestion()')}
 assert(a.node('#app').innerHTML.includes(`${db.questions.length} av ${db.questions.length}`));assert.equal(a.getStored().correct.length,db.questions.length);
 // Latest wrong answers and retry.
 a.run('startQuiz([data.questions[0],data.questions[1]])');a.run('answer((session[qi].answer+1)%session[qi].options.length);nextQuestion();answer(session[qi].answer);nextQuestion()');assert(a.node('#app').innerHTML.includes('1 av 2'));assert.equal(a.getStored().wrong.length,1);
 a.run("go('quiz')");a.node('#quiz-area').value='alle';a.node('#quiz-level').value='alle';a.node('#quiz-mode').value='feil';assert.equal(a.run('quizCandidates().length'),1);
 a.node('#quiz-mode').value='nye';assert.equal(a.run('quizCandidates().length'),0);a.run('quizCount()');assert.equal(a.node('#start-quiz').disabled,true);
 // All matrices, independently expected solution lists and best-response ties.
 for(const g of db.games){assert.equal(a.run(`JSON.stringify(pureEquilibria(data.games.find(g=>g.id==='${g.id}')))`),JSON.stringify(g.equilibria));}
 a.run("go('spill');gameId='ties';selectedCells=new Set(['0-0']);noPure=false;drawMatrix();checkMatrix()");assert(a.node('#matrix-feedback').innerHTML.includes('Riktig'));
 a.run("gameId='coord';selectedCells=new Set(['0-0']);checkMatrix()");assert(a.node('#matrix-feedback').innerHTML.includes('Ikke helt'));
 a.run("selectedCells.add('1-1');checkMatrix()");assert(a.node('#matrix-feedback').innerHTML.includes('Riktig'));
 a.run("gameId='pennies';selectedCells.clear();noPure=false;checkMatrix()");assert(a.node('#matrix-feedback').innerHTML.includes('Velg minst'));
 a.run('noPure=true;checkMatrix()');assert(a.node('#matrix-feedback').innerHTML.includes('Riktig'));
 a.run("revealMatrix=true;drawMatrix()");assert(a.node('#matrix-content').innerHTML.includes('beste respons'));
 a.run("go('kort');cardArea='spill';deck=20;flipped=true;showCard()");assert(a.node('#app').innerHTML.includes('KORT 21 AV '+db.topics.filter(t=>t.area==='spill').length));
 a.run("go('oppgaver')");assert(a.node('#written-list').innerHTML.includes('Cournot fra profitt'));
 a.events.input({target:{id:'draft-w1',dataset:{draft:'w1'},value:'Mitt eget svar <test>'}});assert.equal(a.getStored().drafts.w1,'Mitt eget svar <test>');a.run('listWritten()');assert(a.node('#written-list').innerHTML.includes('&lt;test&gt;'));
 a.run("go('modell');updateModel(100)");assert(a.node('#equilibrium').textContent.includes('30'));
 const b=await create('https:');assert.equal(b.getFetches(),1);const c=await create('https:',true);assert.equal(c.getFetches(),1);assert(c.node('#app').innerHTML.includes(String(db.questions.length)));

 // Fixed lecture fixtures check player identity and both observed move orders.
 const fixtures={
  'notes-pd':[{profile:['L','ll'],payoff:[1,1]},{profile:['LL','l'],payoff:[1,1]}],
  'notes-bos':[{profile:['H','hl'],payoff:[3,2]},{profile:['HL','l'],payoff:[2,3]}],
  'notes-chicken':[{profile:['H','lh'],payoff:[4,2]},{profile:['LH','h'],payoff:[2,3]}],
  'notes-mp':[{profile:['L','lh'],payoff:[3,4]},{profile:['HL','l'],payoff:[4,2]}],
  'notes-variant':[{profile:['L','lh'],payoff:[5,4]},{profile:['HL','l'],payoff:[4,2]}]
 };
 for(const [id,pairs] of Object.entries(fixtures))for(const first of [1,2]){
  const sol=JSON.parse(a.run(`JSON.stringify(solveSequence(data.games.find(g=>g.id==='${id}'),${first}))`));
  assert.deepStrictEqual(sol.profile,pairs[first-1].profile);
  assert.deepStrictEqual(sol.payoff,pairs[first-1].payoff);
  const game=db.games.find(g=>g.base===id&&g.first===first);assert.deepStrictEqual(game.speProfile,sol.profile);assert.deepStrictEqual(game.speOutcome,sol.payoff);assert(game.equilibria.includes(game.spe));
  // Construct every normal-form outcome independently from the contingent plan.
  const base=db.games.find(g=>g.id===id);
  for(let i=0;i<game.rows.length;i++)for(let j=0;j<game.cols.length;j++){
   const rowAction=first===1?i:(game.rows[i][j]==='H'?0:1);
   const colAction=first===1?(game.cols[j][i]==='h'?0:1):j;
   assert.deepStrictEqual(game.payoffs[i][j],base.payoffs[rowAction][colAction]);
  }
 }
 // Fraction checks for the actual lecture examples, not textbook placeholder matrices.
 for(const [id,p,q,u1,u2] of [['notes-bos',3/4,1/4,1.5,1.5],['notes-chicken',1/2,4/5,1.6,1.5],['notes-mp',1/3,1/2,3.5,3]]){
  const m=db.games.find(g=>g.id===id).payoffs,near=(v,w)=>assert(Math.abs(v-w)<1e-9);
  near(q*m[0][0][0]+(1-q)*m[0][1][0],u1);near(q*m[1][0][0]+(1-q)*m[1][1][0],u1);
  near(p*m[0][0][1]+(1-p)*m[1][0][1],u2);near(p*m[0][1][1]+(1-p)*m[1][1][1],u2);
  near(p*q+p*(1-q)+(1-p)*q+(1-p)*(1-q),1);
 }
 a.run("go('forelesning')");assert(a.node('#app').innerHTML.includes('Rettelser og presiseringer'));
 assert(!a.node('#sequence-content').innerHTML.includes('Delspillperfekt profil'));
 a.run("sequenceBase='notes-bos';sequenceFirst=2;sequenceRevealed=true;drawSequence()");assert(a.node('#sequence-content').innerHTML.includes('(HL, l)'));assert(a.node('#sequence-content').innerHTML.includes('(2, 3)'));
 a.events.change({target:{id:'sequence-first',value:'1'}});assert(!a.node('#sequence-content').innerHTML.includes('Delspillperfekt profil'));
 a.run("go('fagstoff')");a.node('#filter').value='forelesning';a.node('#search').value='';a.run('listTopics()');assert(a.node('#topic-count').textContent.startsWith('9 '));
 a.run("go('quiz')");a.node('#quiz-area').value='forelesning';a.node('#quiz-level').value='alle';a.node('#quiz-mode').value='alle';assert.equal(a.run('quizCandidates().length'),46);
 a.run("go('oppgaver')");a.node('#written-area').value='forelesning';a.run('listWritten()');assert(a.node('#written-list').innerHTML.includes('Leksen: snu trekkrekkefølgen'));

 console.log('PASS: legacy progress migration; topic/search filters; per-level quiz; all quiz answers; no double scoring; wrong/new selections; all Nash solutions; ties/no-pure/multiple validation; flashcards; draft saving/escaping; model; HTTP/file/offline loading; lecture filters; ten sequential fixtures; normal-form plans; lecture mixed probabilities and expected payoffs.');
})().catch(e=>{console.error(e);process.exitCode=1});
