const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=require('path').resolve(__dirname,'..')+'/',js=fs.readFileSync(root+'app.js','utf8'),raw=fs.readFileSync(root+'data.json','utf8'),db=JSON.parse(raw);
assert.deepStrictEqual(JSON.parse(fs.readFileSync(root+'index.html','utf8').match(/<script id="study-data" type="application\/json">([\s\S]*?)<\/script>/)[1]),db);
async function create(protocol='file:',offline=false,legacy=null){
 const nodes={},events={};let fetches=0,stored;
 const node=s=>nodes[s]??=( {innerHTML:'',textContent:'',value:'',disabled:false,dataset:{}} );
 node('#study-data').textContent=raw;node('#filter').value='alle';node('#written-area').value='alle';
 for(const [key,value] of Object.entries({'#quiz-area':'alle','#quiz-level':'alle','#quiz-mode':'alle','#quiz-length':'10'}))node(key).value=value;
 const context=vm.createContext({document:{querySelector:node,querySelectorAll:()=>[],addEventListener:(name,fn)=>events[name]=fn},location:{protocol},localStorage:{getItem:()=>legacy?JSON.stringify(legacy):null,setItem:(key,v)=>stored=JSON.parse(v)},window:{scrollTo:()=>{}},fetch:async()=>{fetches++;if(offline)throw Error('offline');return{ok:true,json:async()=>db}}});
 vm.runInContext(js,context);await new Promise(r=>setImmediate(r));assert(node('#app').innerHTML.includes('40'));assert(node('#app').innerHTML.includes('132'));
 return {context,node,nodes,events,getStored:()=>stored,getFetches:()=>fetches,run:code=>vm.runInContext(code,context)};
}
(async()=>{
 const a=await create('file:',false,{read:['5'],correct:['5']});assert.equal(a.getFetches(),0);assert.deepEqual(a.getStored().correct,['q5']);
 a.run("go('fagstoff')");a.node('#filter').value='spill';a.run('listTopics()');assert(a.node('#topic-count').textContent.startsWith('21 '));
 a.node('#search').value='Stackelberg';a.run('listTopics()');assert(a.node('#topics').innerHTML.includes('Stackelberg'));
 a.run("openTopic('g10')");assert(a.node('#app').innerHTML.includes('2/5'));assert(a.node('#app').innerHTML.includes('Øv på dette temaet'));
 a.run("go('quiz')");a.node('#quiz-area').value='spill';a.node('#quiz-level').value='fordypning';a.run('quizCount()');assert(a.node('#quiz-count').textContent.startsWith('14 '));
 a.run("startQuiz(quizCandidates(),10)");assert(a.node('#app').innerHTML.includes('AV 10'));
 // Exercise every answer and check question IDs, not topic IDs, are tracked.
 a.run('startQuiz(data.questions,data.questions.length)');
 for(let i=0;i<132;i++){a.run('answer(session[qi].answer)');a.run('answer(session[qi].answer)');a.run('nextQuestion()')}
 assert(a.node('#app').innerHTML.includes('132 av 132'));assert.equal(a.getStored().correct.length,132);
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
 a.run("go('kort');cardArea='spill';deck=20;flipped=true;showCard()");assert(a.node('#app').innerHTML.includes('KORT 21 AV 21'));
 a.run("go('oppgaver')");assert(a.node('#written-list').innerHTML.includes('Cournot fra profitt'));
 a.events.input({target:{id:'draft-w1',dataset:{draft:'w1'},value:'Mitt eget svar <test>'}});assert.equal(a.getStored().drafts.w1,'Mitt eget svar <test>');a.run('listWritten()');assert(a.node('#written-list').innerHTML.includes('&lt;test&gt;'));
 a.run("go('modell');updateModel(100)");assert(a.node('#equilibrium').textContent.includes('30'));
 const b=await create('https:');assert.equal(b.getFetches(),1);const c=await create('https:',true);assert.equal(c.getFetches(),1);assert(c.node('#app').innerHTML.includes('132'));
 console.log('PASS: legacy progress migration; topic/search filters; per-level quiz; all 132 answers; no double scoring; wrong/new selections; all 12 Nash solutions; ties/no-pure/multiple validation; flashcards; draft saving/escaping; model; HTTP/file/offline loading.');
})().catch(e=>{console.error(e);process.exitCode=1});
