/**
 * entry
 */
 function main () {
  logseq.Editor.registerBlockContextMenuItem("send to flomo", async (e) => {
    const block = await logseq.Editor.getBlock(e.uuid);
    let content = block.content;
    postToFlomo(content);
  });
}
function postToFlomo(uploadContent){
  var formdata = new FormData();
  formdata.append("content", uploadContent);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("在此填入你的flomo专属记录API", requestOptions)
    .then(response => response.text())
    .then(data => {
      const obj = JSON.parse(data);
      logseq.App.showMsg(obj.message);
      })
    .catch(error => logseq.App.showMsg('Error'));
  
}

// bootstrap
logseq.ready(main).catch(console.error)
