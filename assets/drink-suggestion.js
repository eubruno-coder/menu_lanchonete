/* Cross-sell: optional drink recommendation after a savory item. */
(()=>{
 let dismissed=false, shown=false;
 const css=document.createElement('style');
 css.textContent=`
 #drinkSuggestion{position:fixed;z-index:40;right:18px;bottom:94px;width:min(380px,calc(100vw - 36px));background:#fff;color:#262b29;border:1px solid #e9e7e1;border-radius:19px;box-shadow:0 14px 45px #151b1830;padding:16px;animation:drinkEnter .22s ease-out}
 #drinkSuggestion[hidden]{display:none!important}
 #drinkSuggestion .drink-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px}
 #drinkSuggestion .drink-head strong{font-size:16px}
 #drinkSuggestion .drink-head button{background:transparent;color:#656b67;padding:1px 7px;font-size:22px;border:0;line-height:1}
 #drinkSuggestion p{color:#6b716e;font-size:13px;margin:0 0 12px}
 #drinkSuggestion .drink-options{display:grid;gap:8px;max-height:190px;overflow:auto}
 #drinkSuggestion .drink-option{display:flex;align-items:center;gap:10px;padding:9px;background:#f7f7f4;border-radius:12px}
 #drinkSuggestion .drink-icon{font-size:23px}
 #drinkSuggestion .drink-label{flex:1;min-width:0;font-size:13px;line-height:1.3}
 #drinkSuggestion .drink-label b{display:block;font-size:13px}
 #drinkSuggestion .drink-option button{padding:9px 12px;font-size:12px;white-space:nowrap}
 @keyframes drinkEnter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
 @media(max-width:800px){#drinkSuggestion{bottom:92px;left:12px;right:12px;width:auto}}
 @media(prefers-reduced-motion:reduce){#drinkSuggestion{animation:none}}
 `;
 document.head.appendChild(css);
 const panel=document.createElement('section');
 panel.id='drinkSuggestion';panel.hidden=true;
 panel.setAttribute('aria-label','Sugestão de bebidas');
 panel.innerHTML='<div class="drink-head"><strong>🥤 Que tal uma bebida?</strong><button type="button" aria-label="Dispensar sugestão" id="drinkDismiss">×</button></div><p>Uma bebida geladinha combina com seu pedido.</p><div class="drink-options" id="drinkOptions"></div>';
 document.body.appendChild(panel);
 const close=()=>{panel.hidden=true;dismissed=true};
 document.getElementById('drinkDismiss').addEventListener('click',close);
 window.suggestDrink=function(name){
  if(shown||dismissed||!window.products?.length)return;
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
