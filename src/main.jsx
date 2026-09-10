import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, X, Plus, Minus, List, MapPin, FacebookLogo } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/lxgw-wenkai-tc/400.css';
import '@fontsource/lxgw-wenkai-tc/700.css';
import './style.css';
import './ink.css';
import { usePolish } from './usePolish';

gsap.registerPlugin(ScrollTrigger);
const facebook = 'https://www.facebook.com/profile.php?id=100054546905493&locale=zh_TW';
const services = [
  {name:'客製印鑑',en:'PERSONAL SEALS',text:'把你的名字，刻成獨一無二的模樣。',detail:'從日常使用到重要時刻，依照用途討論印章尺寸、材質與字體。歡迎提供想刻的文字，透過 Facebook 詢問適合的製作方式。',type:'stone'},
  {name:'公司大小章',en:'BUSINESS SEALS',text:'為每一次正式落款，留下專業印記。',detail:'公司大章與負責人小章，可依實際使用需求討論配置。請先備妥公司名稱與欲刻文字，製作規格及交期由店家確認。',type:'wood'},
  {name:'開運印章',en:'FORTUNE SEALS',text:'一方好印，寄託一份美好的期許。',detail:'選一方喜歡的章材，為自己或重要的人留下祝福。可與店家討論材質、尺寸與字體，找到適合珍藏的專屬印記。',type:'jade'},
  {name:'質感名片',en:'BUSINESS CARDS',text:'從指尖觸感，開始一段好的相識。',detail:'讓名字與品牌一起被記住。歡迎提供名片內容或既有設計，向店家詢問版面、紙張及印製方式；數量、報價與交期另行確認。',type:'card'},
];
const steps = [
  ['選一方材','每一種材質，都有自己的性格。','從溫潤木質到天然石材，依照用途與喜好，找到屬於你的那一方。'],
  ['尋一款字','讓名字，有自己的表情。','字體的疏密、線條的轉折，在方寸之間，安排恰到好處的平衡。'],
  ['刻一份心','細節，藏在每一道刻痕裡。','依照確認的文字與版面製作，讓每一次落印，都清晰而有分量。'],
  ['留一枚印','一抹朱紅，成為你的印記。','從紙上的第一枚印記開始，陪伴日常，也見證那些重要的時刻。'],
];
function Seal({small=false}) {return <span className={`brand-seal ${small?'small':''}`} aria-hidden="true">{['朱','豐','璋','印'].map(char=><span key={char}>{char}</span>)}</span>}
function External({children,className=''}) {return <a className={className} href={facebook} target="_blank" rel="noreferrer">{children}</a>}
function App(){
  const root = useRef(null), dialog = useRef(null), lastFocus = useRef(null);
  const [menu,setMenu] = useState(false), [active,setActive] = useState(0), [selected,setSelected] = useState(null), [faq,setFaq] = useState(null);
  useLayoutEffect(()=>{
    let mounted = true;
    document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });
    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        gsap.from('.hero-line > span',{yPercent:110,duration:1.25,stagger:.16,ease:'power3.out',delay:.15});
        gsap.from('.hero-photo',{scale:1.09,duration:1.9,ease:'power2.out'});
        gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:38,opacity:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
        gsap.to('.hero-photo',{yPercent:9,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
      },root);
      return ()=>ctx.revert();
    });
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        ScrollTrigger.create({trigger:'.craft',start:'top top',end:'+=1800',pin:true,scrub:true,onUpdate:s=>setActive(Math.min(3,Math.floor(s.progress*4)))});
        const track=document.querySelector('.gallery-track');
        gsap.to(track,{x:()=>-Math.max(0,track.scrollWidth-document.querySelector('.gallery-window').clientWidth),ease:'none',scrollTrigger:{trigger:'.gallery',start:'top top',end:()=>'+='+track.scrollWidth*.65,pin:true,scrub:1,invalidateOnRefresh:true}});
      },root);return ()=>ctx.revert();
    });
    return ()=>{ mounted = false; mm.revert(); };
  },[]);
  useLayoutEffect(()=>{
    if(selected!==null){lastFocus.current=document.activeElement;dialog.current.showModal();}
    else if(dialog.current?.open){dialog.current.close();lastFocus.current?.focus();}
  },[selected]);
  usePolish(root, selected);
  function openItem(item){setSelected(item)}
  return <div ref={root}>
    <header className="header"><a href="#" className="brand" aria-label="朱豐璋刻印部首頁"><Seal small/><span>朱豐璋<span className="brand-sub">刻印部</span></span></a><nav className={menu?'nav open':'nav'} aria-label="主要導覽">{[['關於朱豐璋','about'],['刻印服務','services'],['工藝之間','craft'],['印記選集','works']].map(([text,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{text}</a>)}</nav><External className="header-contact">訂製你的印記 <ArrowUpRight size={17}/></External><button className="menu-toggle" aria-label={menu?'關閉選單':'開啟選單'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={24}/>:<List size={24}/>}</button></header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="red-line"/> 方寸之間，自有分量</div><h1><span className="hero-line"><span>一方印記，</span></span><span className="hero-line"><span>刻下<span className="red">你的名字。</span></span></span></h1><p className="hero-description">把名字交給工藝，讓每一次落印，<br/>都成為值得珍藏的日常。</p><a className="solid-button" href="#services">探索刻印服務 <ArrowUpRight size={20}/></a><div className="hero-caption">信義區刻印・客製印鑑・公司大小章・名片</div></div>
        <div className="hero-image"><img className="hero-photo" src="/images/seals.png" alt="天然石印章、木印章與朱紅印泥的情境示意" fetchPriority="high"/><span className="image-vertical">以刀為筆，以印為信。</span><div className="image-bottom"><span>THE ART OF A PERSONAL MARK</span><span>臺北・信義</span></div></div>
        <div className="hero-footer"><span>朱豐璋刻印部</span><span>一字一刻，一印一心。</span><a href="#about" aria-label="閱讀品牌介紹"><ArrowDown size={20}/></a></div>
      </section>
      <section className="intro section-pad" id="about"><div className="intro-top reveal"><span className="section-kicker">名字的重量，值得好好刻下。</span><span className="tiny">A NAME. A CRAFT. A LASTING MARK.</span></div><div className="intro-body reveal"><div className="intro-seal">一<br/>印<br/>一<br/>心</div><h2>方寸雖小，<br/>承載的<span className="red">從來不少。</span></h2><div className="intro-text"><p>是人生第一份約定，是事業啟程的落款，<br/>也是送給自己，一份長久的祝福。</p><p>朱豐璋刻印部，從一個名字出發。<br/>在字形、章材與印記之間，<br/>陪你找到恰如其分的表達。</p><a href="#craft" className="text-link">走進工藝之間 <ArrowUpRight size={18}/></a></div></div></section>
      <section className="services section-pad" id="services"><div className="section-heading reveal"><span className="section-kicker">為不同時刻，留一枚印。</span><h2>你的需要，<span className="red">我們細細刻畫。</span></h2></div><div className="service-grid">{services.map((s,i)=><button className="service-item reveal" key={s.name} onClick={()=>openItem({...s,kind:'service'})}><div className={`service-art art-${s.type}`}><span className="art-index">0{i+1}</span>{s.type==='card'?<div className="business-card"><Seal small/><span>朱豐璋<small>刻 印 部</small></span></div>:<div className={`object-seal ${s.type}`}><span>{s.type==='wood'?'朱豐璋印':s.type==='jade'?'吉祥如意':'一印一心'}</span></div>}<span className="art-view"><ArrowUpRight size={22}/></span></div><div className="service-title"><h3>{s.name}</h3><span>{s.en}</span></div><p>{s.text}</p></button>)}</div></section>
      <section className="craft" id="craft"><div className="craft-visual"><img src="/images/craft.png" alt="刻刀雕琢石章與細小石屑的工藝情境示意" loading="lazy" style={{objectPosition:`${45+active*10}% center`,transform:`scale(${1.03+active*.06})`}}/><div className="craft-shade"/><span className="craft-vertical">慢慢琢磨，細細成章。</span><span className="craft-image-label">THE MAKING OF A MARK</span></div><div className="craft-content"><span className="section-kicker">工藝之間</span><h2>從一方材，<br/>到<span>你的印。</span></h2><div className="step-tabs" role="tablist" aria-label="刻印流程">{steps.map((s,i)=><button role="tab" id={`step-tab-${i}`} aria-controls="step-panel" aria-selected={active===i} key={s[0]} onClick={()=>setActive(i)} className={active===i?'active':''}><span>0{i+1}</span>{s[0]}</button>)}</div><div className="step-copy" id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} key={active}><span className="step-number">0{active+1}</span><h3>{steps[active][1]}</h3><p>{steps[active][2]}</p></div><External className="text-link light">聊聊你的訂製想法 <ArrowUpRight size={19}/></External></div></section>
      <section className="gallery section-pad" id="works"><div className="gallery-heading reveal"><div><span className="section-kicker">印記選集</span><h2>每一方，<span className="red">各有其形。</span></h2></div><p>材質、字形、紙上風景。<br/>尋找你喜歡的印記模樣。</p></div><div className="gallery-window"><div className="gallery-track">{[{title:'溫潤如初',tag:'天然石材・印鑑意象',style:'photo',image:'/images/stone.png'}, {title:'落款有聲',tag:'朱紅印記・篆字之美',style:'print'}, {title:'握在手心的祝福',tag:'客製印章・日常珍藏',style:'dark',image:'/images/gift.png'}, {title:'相識，從一張名片開始',tag:'紙感名片・品牌印象',style:'paper'}].map((work,i)=><button className="work" key={work.title} onClick={()=>openItem({...work,kind:'work',detail:'此為品牌視覺情境示意。實際章材、款式與訂製細節，歡迎透過 Facebook 與店家討論。'})}><div className={`work-image work-${work.style}`}>{i===0||i===2?<img src={work.image} loading="lazy" alt={work.title+'情境示意'}/>:i===1?<div className="print-composition"><Seal/><span>方寸之間<br/>見字如面</span></div>:<div className="paper-composition"><span>朱豐璋</span><Seal small/><small>一字一刻，一印一心。</small></div>}<span className="work-expand"><Plus size={24}/></span></div><div className="work-caption"><h3>{work.title}</h3><span>{work.tag}</span></div></button>)}</div></div><p className="image-note">本頁情境影像與材質展示為設計示意，實際作品依門市提供為準。</p></section>
      <section className="faq-section section-pad"><div className="faq-title reveal"><span className="section-kicker">訂製之前</span><h2>你可能<br/>也想知道。</h2></div><div className="faq-list">{[['想訂製印章，需要準備什麼？','準備想刻的文字、使用用途，以及喜歡的材質或風格。若有參考圖片，也可以一併傳至 Facebook，方便店家了解你的需求。'],['可以快速刻印嗎？','歡迎先告知需要使用的時間。製作時間會依章材、款式與當日安排而不同，請直接向店家確認可取件的時間。'],['可以訂製公司大小章與名片嗎？','可以洽詢公司大小章與名片服務。提供公司名稱、欲刻文字或名片內容，店家將協助確認規格與報價。'],['如何詢問價格與到店資訊？','點選 Facebook 詢問，提供想製作的品項與數量，即可向店家確認報價、營業時間與到店方式。']].map(([q,a],i)=><div className="faq-item" key={q}><button aria-expanded={faq===i} aria-controls={`faq-${i}`} onClick={()=>setFaq(faq===i?null:i)}>{q}{faq===i?<Minus size={20}/>:<Plus size={20}/>}</button><div id={`faq-${i}`} hidden={faq!==i}><p>{a}</p></div></div>)}</div></section>
      <section className="contact section-pad" id="contact"><div className="contact-top"><span><MapPin size={16}/> 臺北・信義區</span><span>LET’S MAKE YOUR MARK.</span></div><div className="contact-main reveal"><h2>你的下一方印記，<br/>從這裡<span>開始。</span></h2><External className="contact-circle"><ArrowUpRight size={40}/><span>Facebook 詢問</span></External></div><div className="contact-bottom"><p>客製印鑑 / 公司大小章 / 開運章 / 名片</p><External>營業時間與到店資訊，歡迎私訊確認 <ArrowUpRight size={16}/></External></div></section>
    </main>
    <footer className="footer"><a href="#" className="brand"><Seal small/><span>朱豐璋<span className="brand-sub">刻印部</span></span></a><span>© {new Date().getFullYear()} 朱豐璋刻印部</span><External><FacebookLogo size={19}/> Facebook <ArrowUpRight size={15}/></External></footer>
    <dialog ref={dialog} className={`detail-dialog ${selected?.kind==='work'?'work-dialog':''}`} aria-labelledby="dialog-title" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}}><button className="dialog-close" onClick={()=>setSelected(null)} aria-label="關閉詳細介紹"><X size={25}/></button>{selected&&<>{selected.kind==='work'&&<div className={`dialog-art work-${selected.style}`}>{selected.style==='photo'||selected.style==='dark'?<img src={selected.image} alt={selected.title+'情境示意'}/>:selected.style==='print'?<div className="print-composition"><Seal/><span>方寸之間<br/>見字如面</span></div>:<div className="paper-composition"><span>朱豐璋</span><Seal small/><small>一字一刻，一印一心。</small></div>}</div>}<div className="dialog-content">{selected.kind==='service'&&<Seal/>}<span className="section-kicker">{selected.kind==='work'?'印記選集':'刻印服務'}</span><h2 id="dialog-title">{selected.name||selected.title}</h2><p>{selected.detail}</p><External className="solid-button">詢問訂製細節 <ArrowUpRight size={20}/></External></div></>}</dialog>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
