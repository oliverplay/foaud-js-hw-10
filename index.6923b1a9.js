const e=document.querySelector(".breed-select"),n=document.querySelector(".error"),t=document.querySelector(".loader"),r=document.querySelector(".cat-info");function s(){return fetch("https://api.thecatapi.com/v1/breeds").then((e=>{if(!e.ok)throw new Error(e.message);return e.json()}))}function c(n,t){const r=n.map((e=>`\n          <option value="${e.id}" \n          ${e.id===t?"selected":""}>\n          ${e.name}\n          </option>\n        `));e.innerHTML=r.join("")}function o(){return n.style.display="block"}n.style.display="none",e.addEventListener("change",(()=>{const n=e.value;s().then((e=>c(e,n))).catch((e=>console.error(e.message)))})),s().then((e=>c(e))).catch((e=>console.error(e.message))),e.addEventListener("change",(function(n){const s=`https://api.thecatapi.com/v1/images/search?breed_ids=${e.value}`;return t.style.display="block",fetch(s,{headers:{"x-api-key":"live_C734cUl9G5vw5WzWkJkOr3wfXpv4bMjqpzlgBZgAf1GvLf86HN3vBSmf0KHTcwPu"}}).then((e=>{if(!e.ok)throw new Error(e.message);return e.json()})).then((e=>{console.log(e);const n=e.map((e=>function(e){return`\n        <div class='breed-card'>\n          <div><h2 class="breed-name">${e.breeds[0].name}</h2>\n          <p class="breed-description">${e.breeds[0].description}</p>\n          <p class="breed-temperament">${e.breeds[0].temperament}</p></div>\n          <img class="breed-image" height = ${Number(e.height)} width = ${Number(e.width)} src=${e.url}>\n        </div>\n      `}(e))).join("");var s;t.style.display="none",s=n,r.innerHTML=s})).catch(o)}));
//# sourceMappingURL=index.6923b1a9.js.map
