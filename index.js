window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create new instance of speech recognition
const recognition = new SpeechRecognition();
//set interim results
//as you are speaking - you see the results, when false - need to stop speaking
//to any anything, when true - we see what we are saying as we are speaking
recognition.interimResults = true;

//create a paragraph the last we will updates while speaking
//when stop speaking - then start - new paragraph will be created

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (evt) => {
  //console.log(evt.results); //evt.results.isFinal - is the person dano speaking that sentense

  const transcripts = Array.from(evt.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcripts; //when we are dont with the sentense p will be replaced with new

  //create new p when done
  if(evt.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  if(transcripts.includes('маршрут')) {
    //createRoute(); run some func to create hands off app //do not forget to debounce func
    console.log('YEAH!');
  }
});

//we are listening for the result evt, but once it is finished (when we stop)
// it will not work, it is unbind itself and no longer listening
//when end - start again
recognition.addEventListener('end', recognition.start);

recognition.start();
