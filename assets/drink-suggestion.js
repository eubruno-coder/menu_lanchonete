/* Cross-sell: optional drink recommendation after a savory item. */
(()=>{
 let dismissed=false, shown=false;
 const css=document.createElement('style');
 css.textContent=`
 #drinkSuggestion{position:fixed;z-index:40;right:18px;bottom:94px;width:min(380px,calc(100vw - 36px));background:linear-gradient(145deg,#fffaf2 0%,#fff 52%,#fff4e6 100%);color:#262b29;border:1px solid #e8c8a7;border-radius:21px;box-shadow:0 18px 55px #29180e38,0 0 0 3px #f6ddc052;padding:17px;animation:drinkEnter .36s cubic-bezier(.2,.85,.3,1)}
 #drinkSuggestion[hidden]{display:none!important}
 #drinkSuggestion .drink-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px}
 #drinkSuggestion .drink-head strong{font-size:19px;line-height:1.2;letter-spacing:-.02em;color:#37261e} #drinkSuggestion .drink-kicker{display:inline-flex;align-items:center;gap:5px;background:#fff0d9;color:#955318;border:1px solid #f0d2a9;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.09em;padding:5px 9px;margin-bottom:8px;text-transform:uppercase}
 #drinkSuggestion .drink-head button{background:transparent;color:#656b67;padding:1px 7px;font-size:22px;border:0;line-height:1}
 #drinkSuggestion p{color:#6b716e;font-size:13px;margin:0 0 12px}
 #drinkSuggestion .drink-options{display:grid;gap:8px;max-height:190px;overflow:auto}
 #drinkSuggestion .drink-option{display:flex;align-items:center;gap:10px;padding:10px;background:#fff;border:1px solid #f0e5d7;border-radius:13px;transition:transform .16s,border-color .16s} #drinkSuggestion .drink-option:focus-within{border-color:#aa3042} #drinkSuggestion .drink-option:hover{transform:translateY(-1px)}
 #drinkSuggestion .drink-icon{font-size:23px}
 #drinkSuggestion .drink-label{flex:1;min-width:0;font-size:13px;line-height:1.3}
 #drinkSuggestion .drink-label b{display:block;font-size:13px}
 #drinkSuggestion .drink-option button{padding:9px 12px;font-size:12px;white-space:nowrap;background:#aa3042;color:white;border-radius:10px;font-weight:750} #drinkSuggestion .drink-footnote{margin:11px 0 0!important;font-size:11px!important;color:#94765c!important;text-align:center}
 @keyframes drinkEnter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
 @media(max-width:800px){#drinkSuggestion{bottom:92px;left:12px;right:12px;width:auto}}
 @media(prefers-reduced-motion:reduce){#drinkSuggestion{animation:none}}
 `;
 document.head.appendChild(css);
 const panel=document.createElement('section');
 panel.id='drinkSuggestion';panel.hidden=true;
 panel.setAttribute('aria-label','Sugestão de bebidas');
 panel.innerHTML='<span class="drink-kicker">✨ Complete seu pedido</span><div class="drink-head"><strong>Seu lanche merece uma companhia! 🥤</strong><button type="button" aria-label="Dispensar sugestão" id="drinkDismiss">×</button></div><p>Olha só o que combina com o que você escolheu 👀</p><div class="drink-options" id="drinkOptions"></div><p class="drink-footnote">Só entra no carrinho se você escolher.</p>';
 document.body.appendChild(panel);
 const close=()=>{panel.hidden=true;dismissed=true};
 document.getElementById('drinkDismiss').addEventListener('click',close);
 window.suggestDrink=function(name){
  if(shown||dismissed||!products?.length)return;
  const source=products.find(p=>p[0]===name);
  if(!source||!['Pastéis','Lanches'].includes(source[2]))return;
  if(cart.some(p=>products.some(x=>x[2]==='Bebidas'&&x[0]===p.name)))return;
  const drinks=products.map((p,i)=>({p,i})).filter(x=>x.p[2]==='Bebidas').slice(0,3);
  if(!drinks.length)return;
  const list=document.getElementById('drinkOptions');
  list.replaceChildren();
  drinks.forEach(({p})=>{
   const item=document.createElement('div');item.className='drink-option';
   const icon=document.createElement('span');icon.className='drink-icon';icon.textContent='🥤';
   const label=document.createElement('span');label.className='drink-label';
   const title=document.createElement('b');title.textContent=p[0];
   const price=document.createElement('span');price.textContent=money(p[1]);label.append(title,price);
   const btn=document.createElement('button');btn.type='button';btn.textContent='Adicionar +';
   btn.setAttribute('aria-label','Adicionar '+p[0]);
   btn.addEventListener('click',()=>{add(p[0],p[1],'');close()});
   item.append(icon,label,btn);list.append(item);
  });
  shown=true;panel.hidden=false;
 };
})();
