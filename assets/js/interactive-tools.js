/* Talha LABS interactive tools — progressive enhancement, no external dependencies */
(function(){
  'use strict';
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  function openWhatsApp(message){window.open('https://wa.me/923006700196?text='+encodeURIComponent(message),'_blank','noopener');}

  /* Service finder */
  var search=$('#tl-service-search'), cards=$$('[data-service-card]'), filters=$$('.tl-filter-row [data-filter]'), activeFilter='all';
  function filterServices(){
    if(!cards.length)return;
    var q=(search?search.value:'').trim().toLowerCase(),shown=0;
    cards.forEach(function(card){
      var text=card.textContent.toLowerCase(),matchesText=!q||text.indexOf(q)>-1;
      var category=card.getAttribute('data-category')||'all';
      var matchesCategory=activeFilter==='all'||category===activeFilter||(activeFilter==='profiles'&&/profile|hba1c|hormone|vitamin/.test(text))||(activeFilter==='blood'&&/blood|cbc|hematology|serology/.test(text))||(activeFilter==='support'&&/home sampling|digital reports|consultation|screening/.test(text));
      card.hidden=!(matchesText&&matchesCategory);if(!card.hidden)shown++;
    });
    var count=$('#tl-service-count');if(count)count.textContent='Showing '+shown+' of '+cards.length+' services';
  }
  if(search)search.addEventListener('input',filterServices);
  filters.forEach(function(btn){btn.addEventListener('click',function(){activeFilter=btn.getAttribute('data-filter');filters.forEach(function(b){b.classList.toggle('is-active',b===btn);});filterServices();});});
  cards.forEach(function(card){var t=card.textContent.toLowerCase();var cat=/home sampling|digital reports|consultation|screening/.test(t)?'support':/profile|hba1c|hormone|vitamin/.test(t)?'profiles':'blood';card.setAttribute('data-category',cat);});
  if(cards.length)filterServices();

  /* Test enquiry builder: never invents prices */
  var testSearch=$('#tl-test-search'),testChecks=$$('.tl-test-option input'),selectedList=$('#tl-selected-list'),empty=$('#tl-selected-empty'),sendRates=$('#tl-send-rates');
  function updateTests(){
    var chosen=testChecks.filter(function(c){return c.checked;});
    if(selectedList){selectedList.innerHTML='';chosen.forEach(function(c){var li=document.createElement('li');li.textContent=c.value;selectedList.appendChild(li);});}
    if(empty)empty.hidden=chosen.length>0;
    if(sendRates)sendRates.disabled=chosen.length===0;
  }
  testChecks.forEach(function(c){c.addEventListener('change',updateTests);});
  if(testSearch)testSearch.addEventListener('input',function(){var q=testSearch.value.toLowerCase();$$('.tl-test-option').forEach(function(row){row.hidden=row.textContent.toLowerCase().indexOf(q)===-1;});});
  if(sendRates)sendRates.addEventListener('click',function(){
    var chosen=testChecks.filter(function(c){return c.checked;}).map(function(c){return '• '+c.value;});
    var note=$('#tl-rate-note');var msg='Assalam o Alaikum, I would like to enquire about these tests/services at Talha Labs:\n'+chosen.join('\n')+'\n\nPlease confirm current rates, availability, preparation and expected report timing.'+(note&&note.value.trim()?'\nAdditional note: '+note.value.trim():'');
    openWhatsApp(msg);
  });
  updateTests();

  /* Contact enquiry builder */
  var contactForm=$('#tl-contact-form');
  if(contactForm)contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('#tl-contact-name'),type=$('#tl-contact-type'),note=$('#tl-contact-message');
    var msg='Assalam o Alaikum, I would like to contact Talha Labs.\nEnquiry: '+(type?type.value:'General information')+(name&&name.value.trim()?'\nName: '+name.value.trim():'')+(note&&note.value.trim()?'\nMessage: '+note.value.trim():'');
    var feedback=$('#tl-contact-feedback');if(feedback)feedback.textContent='WhatsApp is opening. Review your message and press Send to submit your enquiry.';
    openWhatsApp(msg);
  });

  /* Bottom quick-action dock removed for a cleaner page layout. */
  if(!$('#tl-reading-progress')){var bar=document.createElement('div');bar.id='tl-reading-progress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);}
  var progress=$('#tl-reading-progress'),ticking=false;
  function updateProgress(){var doc=document.documentElement,scroll=doc.scrollTop||document.body.scrollTop,max=doc.scrollHeight-doc.clientHeight;if(progress)progress.style.width=(max>0?Math.min(100,scroll/max*100):0)+'%';ticking=false;}
  window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});updateProgress();

  /* FAQ accordions: keep one answer open at a time per list */
  $$('.tl-faq-list').forEach(function(list){$$('details',list).forEach(function(d){d.addEventListener('toggle',function(){if(d.open)$$('details',list).forEach(function(other){if(other!==d)other.open=false;});});});});
})();