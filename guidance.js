(() => {
  const shell = document.querySelector('.shell');
  const nav = document.createElement('nav'); nav.className='page-nav'; nav.setAttribute('aria-label','页面导航');
  nav.innerHTML='<a href="index.html">填写确认表 / 入力</a><a href="opportunities.html">岗位与工签判断 / 求人・在留資格</a>';
  shell.insertBefore(nav, shell.children[1]);
  const hints = {
    visa_status:['按现在的实际所在地选择。在日本不等于已有工作许可；不清楚可先留空。','現在地で選択。日本滞在と就労許可は別です。不明なら空欄で構いません。'],
    sponsorship:['如果需要公司帮助申请或变更可工作的在留资格，选“需要”；不确定可留空。','会社に就労可能な在留資格の申請・変更支援を求める場合は「必要」。不明なら空欄で可。'],
    travel:['按能接受的最长连续驻场时间选择；“有限制”可以是只能短期或只能国内。','連続出張できる期間で選択。「条件あり」は短期のみ・国内のみ等。'],
    location:['“全国可”表示愿意考虑日本各地的岗位；有家庭或地区限制就选“有限制”。','「全国可」は日本各地の勤務地を検討できる場合。地域制限があれば「条件あり」。'],
    start_date:['写大致时间即可。点下面示例可以直接填入，也能修改。','おおよその時期で可。下の例を押して入力・編集できます。'],
    salary:['写税前年薪、单位为万日元；包含奖金与否可注明。暂时不清楚可写“面议”。','税込年収を万円単位で記入。賞与の有無も記載可。不明なら「応相談」。'],
    conditions:['仅勾选现在愿意接受的条件。洁净室经验不代表你现在一定愿意接受。未勾选表示未确认。','現在受け入れ可能な条件だけ選択。経験と勤務意向は別です。未選択は未確認です。'],
    highlight:['可跳过。想写时用这句结构：在【项目】负责【工作】，解决【问题】，结果【结果】。不用专业长文。','省略可。「【案件】で【業務】を担当し、【問題】を解決、【結果】となった」の1文で可。'],
    jsw_extra:['不需要完整复盘；能写多少台、几名协力人员、一个故障和最后是否验收即可。','詳細な報告は不要。台数・協力会社人数・不具合1件・最終結果だけで十分です。'],
    ulvac_extra:['不会的不要猜。只填本人确认过的型号、Pump / Valve / 配线 / I/O Check或一个典型问题。','不明な内容は推測しないでください。確認済みの型式、Pump・Valve・配線・I/O Check等だけ入力します。'],
    canon_hirano_extra:['可按“设备/模块 → 做过的精度调整 → 交付结果”写一行；想不起就留空。','「設備・モジュール → 精度調整 → 引渡し結果」の順に1行で可。不明なら空欄で構いません。']
  };
  const helpNodes=[];
  Object.entries(hints).forEach(([name, translations])=>{
    const input=document.querySelector('[name="'+name+'"]');if(!input)return;
    const field=input.closest('.field');const p=document.createElement('p');p.className='help';p.id='help-'+name;
    helpNodes.push([p,translations]);field.append(p);
    field.querySelectorAll('input,select,textarea').forEach(control=>control.setAttribute('aria-describedby',p.id));
  });
  const samples={start_date:[['签证办好后约1个月','ビザ取得後約1か月'],['拿到录用通知后商议','内定後に相談']],salary:[['面议','応相談']]};
  Object.entries(samples).forEach(([name, choices])=>{
    const input=document.querySelector('[name="'+name+'"]');if(!input)return;const group=document.createElement('div');group.className='hint-chips';
    choices.forEach(pair=>{const b=document.createElement('button');b.type='button';helpNodes.push([b,pair]);b.addEventListener('click',()=>{input.value=b.textContent;input.dispatchEvent(new Event('input',{bubbles:true}));});group.append(b);});input.after(group);
  });
  const refresh=()=>{const ja=document.documentElement.lang==='ja';helpNodes.forEach(([node,pair])=>node.textContent=pair[ja?1:0]);};
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});refresh();
})();
