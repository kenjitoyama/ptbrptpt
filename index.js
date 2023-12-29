async function loadData() {
  console.time('Loading data');
  const response = await fetch('./data.json');
  const rawJson = await response.json();
  let br2pt = new Map();
  let pt2br = new Map();
  for (const [br, pt] of rawJson) {
    br2pt.set(br, pt);
    pt2br.set(pt, br);
  }
  console.timeEnd('Loading data', br2pt, pt2br);
  return [br2pt, pt2br];
}

function addListeners(br2pt, pt2br) {
  const inputBr2Pt = document.getElementById('input-br2pt');
  const inputPt2Br = document.getElementById('input-pt2br');
  inputBr2Pt.addEventListener('input', ev => {
    const brWord = ev.target.value;
    const ptWord = br2pt.get(brWord);
    if (ptWord != null) {
      document.getElementById('input-pt2br').value = ptWord;
    }
  });
  inputPt2Br.addEventListener('input', ev => {
    const ptWord = ev.target.value;
    const brWord = pt2br.get(ptWord);
    if (brWord != null) {
      document.getElementById('input-br2pt').value = brWord;
    }
  });
}

const [br2pt, pt2br] = await loadData();
addListeners(br2pt, pt2br);
