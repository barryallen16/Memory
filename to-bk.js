javascript: (function(){
      var Y={'1':['i','1','firstyear'],'I-year':['i','1','firstyear'],'2':['ii','2','secondyear'],'II-year':['ii','2','secondyear'],'3':['iii','3','thirdyear','prefinalyear'],'III-year':['iii','3','thirdyear','prefinalyear'],'4':['iv','4','fourthyear','finalyear'],'IV-year':['iv','4','fourthyear','finalyear']},
          S={'1':['i','1'],'2':['ii','2'],'3':['iii','3'],'4':['iv','4'],'5':['v','5'],'6':['vi','6'],'7':['vii','7'],'8':['8','viii']},
          D={'CSE':{v:'CSE',p:['cse','c.s.e','computerscienceengineering']},'CFIS':{v:'CFIS',p:['cse','cfis','cyberforensicsandinformationalsecurity','cybersecurity']},'AI':{v:'Artificial Intelligence',p:['ai','artificialintelligence'],npv:['artificialintelligenceanddatascience','ds&ai','ai&ds','artificialintelligence&datascience','aids']},'IT':{v:'Information Technology',p:['it','Information technology']},'DS&AI':{v:'DS & AI',p:['artificialintelligenceanddatascience','ds&ai','ai&ds','artificialintelligence&datascience','aids']}};

      var qs=document.querySelectorAll('div[role="listitem"]'),
          set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;

      var M=[
        {p:['college','university','institution'],v:'Dr. M.G.R. Educational and Research Institute',pv:['Dr. M.G.R. Educational and Research Institute','dr.m.g.r.educationalandresearchinstitute']},
        {p:['name','student name','full name'],v:${S(d.name)}},
        {p:['reg no','register number','roll no'],v:${S(d.regNo)}},
        {p:['phone','contact','mobile'],v:${S(d.phone)}},
        {p:['whatsapp'],v:${S(d.whatsapp)}},
        {p:['email','mail'],v:${S(d.email)}},
        {p:['year','year of study'],np:['year of passing'],v:${S(
          d.year
        )},pv:Y[${S(d.year)}]||[]},
        {p:['branch','department'],v:(D[${S(d.dept)}]||{}).v||${S(
      d.dept
    )},pv:(D[${S(d.dept)}]||{}).p||[],npv:(D[${S(d.dept)}]||{}).npv},
        {p:['gender'],v:${S(d.gender)},pv:${S(
      d.gender
    )}=='Male'?['male','m']:['female','f']},
        {p:['semester'],v:${S(d.semester)},pv:S[${S(d.semester)}]||[]},
        {p:['degree'],v:'btech',pv:['b.tech']},
        {p:['section'],v:${S(d.section)}},
        {p:['10%','10th'],v:${S(d.tenPercent)}},
        {p:['12%','12th'],v:${S(d.twelvePercent)}},
        {p:['cgpa'],np:['pg'],v:${S(d.cgpa)}},
        {p:['arrears'],v:${S(d.arrears)}},
        {p:['date of birth'],v:${S(d.dob)}},
        {p:['year of passing'],v:${S(d.yop)},pv:[${S(d.yop)}]},
        {p:['interview'],v:${S(d.interview)}=='yes'?'yes':'none',pv:${S(
      d.interview
    )}=='yes'?['yes']:[]}
      ];

      var norm=function(s){return s.toLowerCase().replace(/\\s+/g,'')};

      qs.forEach(function(q){
        var sp=q.querySelector('span');
        if(!sp)return;
        var txt=sp.innerText.toLowerCase();
        for(var i=0;i<M.length;i++){
           var m=M[i];
           if(m.p.some(function(p){return txt.includes(p)})){
             if(m.np&&m.np.some(function(n){return txt.includes(n)}))continue;
             
             var inp=q.querySelector('input:not([type=hidden])'),
                 rad=q.querySelectorAll('[role="radio"]'),
                 opt=q.querySelectorAll('[role="option"]');
             
             if(opt.length){
               opt.forEach(function(o){o.setAttribute('aria-selected','false');o.tabIndex=-1});
               opt.forEach(function(o){
                 if(m.pv&&m.pv.includes(norm(o.dataset.value))){
                   o.setAttribute('aria-selected','true');o.tabIndex=0;o.click();
                   setTimeout(function(){o.click()},100);
                 }
               });
             } else if(rad.length){
               rad.forEach(function(r){
                 var rv=norm(r.dataset.value);
                 if(m.npv&&m.npv.includes(rv))return;
                 if(m.pv&&m.pv.includes(rv))r.click();
               });
             } else if(inp){
               set.call(inp,m.v);
               inp.dispatchEvent(new Event('input',{bubbles:true}));
               inp.dispatchEvent(new Event('change',{bubbles:true}));
             }
             break; 
           }
        }
      });
    })();
