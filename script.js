let submitBtn = document.getElementById('submit-btn');

let generateGif = () => {
  // display loader until gif loads
  let loader = document.querySelector('.loader');
  loader.style.display = 'block';
  document.querySelector('.wrapper').style.display = 'none';

  // get search value (default = laugh)
  let q = document.getElementById('search-box').value;
  
  // display 10 gifs in the result
  let gifCount = 10;

  // API URL
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=SL2EpUFBoTu20qdxyy8PMgFosDo28DI7&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector('.wrapper').innerHTML = "";

  // make a call to the API
  fetch(finalURL)
    .then(resp => resp.json())
    .then(info => {
      console.log(info.data);
      // all gifs
      let gifsData = info.data;
      gifsData.forEach(gif => {
        // generate card for every gif
        let container = document.createElement('div');
        container.classList.add('container');
        let iframe = document.createElement('img');
        console.log(gif);
        iframe.setAttribute('src', gif.images.downsized_medium.url);
        iframe.onload = () => {
          // if iframes has loaded correctly, reduce the count when each gif loads
          gifCount--;
          if(gifCount == 0) {
            // if all gifs have loaded, then hide loader and display gifs UI
            loader.style.display = 'none';
            document.querySelector('.wrapper').style.display = 'grid';
          }
        }
        container.append(iframe);
        document.querySelector('.wrapper').append(container);

        // button to copy link
        let copyBtn = document.createElement('button');
        copyBtn.innerText = 'Copy Link';
        copyBtn.onclick = () => {
          // append the obtained ID to default URL
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          // copy text inside the text field
          navigator.clipboard.writeText(copyLink).then(() => {
            alert('GIF copied to clipboard!');
          }).catch(() => {
            // if navigator is not supported
            alert('GIF copied to clipboard!');
            let hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'text');
            document.body.appendChild(hiddenInput);
            hiddenInput.value = copyLink;
            hiddenInput.select();
            document.execCommand('copy');
            document.body.removeChild(hiddenInput);
          })
        }
        container.append(copyBtn);
      })
    });
}

// generate gifs on screen load or when user clicks on submit
submitBtn.addEventListener('click', generateGif);
window.addEventListener('load', generateGif);