import { useState, useEffect, useCallback } from "react";
import { Search, ChevronRight, ChevronLeft, Shield, User, Dumbbell, Camera, MapPin, Clock, Star, Heart, X, Check, MessageCircle, Send, Settings, LogOut, Edit, Award, Zap, Users, Calendar, Filter, Bell, Plus, AlertTriangle, Info, ArrowRight, ArrowLeft, Upload, CreditCard, Briefcase, Target, TrendingUp, Activity, BarChart2, Play, Image, ToggleLeft, ToggleRight, Trash2, HelpCircle, Flag, ThumbsUp, Eye } from "lucide-react";

/* ═══════════════════════════════════════════════════
   GYMLINK v3 — Complete Fitness Partner Platform
   Time-based matching · Request system · Marketplace
   ═══════════════════════════════════════════════════ */

const T = {
  bg: "#0A0A0F", bgCard: "#13131A", bgCardHover: "#1A1A24", bgInput: "#1C1C28",
  border: "#2A2A3A", borderFocus: "#6C5CE7",
  primary: "#6C5CE7", primaryGlow: "rgba(108,92,231,0.3)", primaryLight: "#A29BFE",
  accent: "#00CEC9", accentGlow: "rgba(0,206,201,0.25)",
  danger: "#FF6B6B", dangerGlow: "rgba(255,107,107,0.2)",
  warning: "#FECA57", success: "#00B894", successGlow: "rgba(0,184,148,0.2)",
  text: "#F0F0F5", textMuted: "#8888A0", textDim: "#55556A",
  gradient: "linear-gradient(135deg,#6C5CE7 0%,#00CEC9 100%)",
  gradientHot: "linear-gradient(135deg,#FF6B6B 0%,#FECA57 100%)",
  shadow: "0 8px 32px rgba(0,0,0,0.4)", radius: "14px", radiusSm: "10px",
  font: "'DM Sans','Manrope',sans-serif",
};

const injectGlobalStyles = () => {
  if (document.getElementById("gl-g")) return;
  const s = document.createElement("style"); s.id = "gl-g";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Manrope:wght@300;400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${T.bg};font-family:${T.font};color:${T.text};-webkit-font-smoothing:antialiased}
    input,select,textarea,button{font-family:inherit}
    input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px ${T.primaryGlow}}50%{box-shadow:0 0 40px ${T.primaryGlow},0 0 60px rgba(108,92,231,0.15)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
    .fade-in-up{animation:fadeInUp .5s ease both}.fade-in{animation:fadeIn .4s ease both}
    .scale-in{animation:scaleIn .3s ease both}.slide-up{animation:slideUp .35s ease both}
  `;
  document.head.appendChild(s);
};

// ═══ UI ATOMS ═══
const Btn = ({children,variant="primary",size="md",disabled,onClick,style:sx,...r})=>{
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,border:"none",cursor:disabled?"not-allowed":"pointer",fontWeight:600,borderRadius:T.radiusSm,transition:"all .25s",opacity:disabled?.45:1,fontFamily:T.font,letterSpacing:".01em",...(size==="sm"?{padding:"8px 16px",fontSize:13}:size==="lg"?{padding:"16px 32px",fontSize:16}:{padding:"12px 24px",fontSize:14})};
  const v={primary:{background:T.gradient,color:"#fff",boxShadow:`0 4px 20px ${T.primaryGlow}`},secondary:{background:T.bgInput,color:T.text,border:`1px solid ${T.border}`},ghost:{background:"transparent",color:T.textMuted},danger:{background:T.danger,color:"#fff"},success:{background:T.success,color:"#fff"},outline:{background:"transparent",color:T.primary,border:`1.5px solid ${T.primary}`},outlineDanger:{background:"transparent",color:T.danger,border:`1.5px solid ${T.danger}`}};
  return <button disabled={disabled} onClick={onClick} style={{...base,...v[variant],...sx}} onMouseEnter={e=>{if(!disabled)e.target.style.transform="translateY(-1px)"}} onMouseLeave={e=>{e.target.style.transform="translateY(0)"}} {...r}>{children}</button>;
};

const Input=({label,error,style:sx,containerStyle,...p})=>{
  const[f,sf]=useState(false);
  return <div style={{width:"100%",...containerStyle}}>
    {label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>{label}</label>}
    <input {...p} style={{width:"100%",padding:"12px 16px",background:T.bgInput,border:`1.5px solid ${error?T.danger:f?T.borderFocus:T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none",transition:"border-color .2s",...sx}} onFocus={e=>{sf(true);p.onFocus&&p.onFocus(e)}} onBlur={e=>{sf(false);p.onBlur&&p.onBlur(e)}}/>
    {error&&<p style={{fontSize:12,color:T.danger,marginTop:4}}>{error}</p>}
  </div>;
};

const TextArea=({label,error,style:sx,...p})=>{
  const[f,sf]=useState(false);
  return <div style={{width:"100%"}}>
    {label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>{label}</label>}
    <textarea {...p} style={{width:"100%",padding:"12px 16px",background:T.bgInput,border:`1.5px solid ${error?T.danger:f?T.borderFocus:T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none",resize:"vertical",minHeight:80,fontFamily:T.font,...sx}} onFocus={e=>{sf(true);p.onFocus&&p.onFocus(e)}} onBlur={e=>{sf(false);p.onBlur&&p.onBlur(e)}}/>
    {error&&<p style={{fontSize:12,color:T.danger,marginTop:4}}>{error}</p>}
  </div>;
};

const Chip=({label,selected,onClick})=><button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",background:selected?T.primary+"22":T.bgInput,border:`1.5px solid ${selected?T.primary:T.border}`,borderRadius:999,color:selected?T.primaryLight:T.textMuted,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s",fontFamily:T.font}}>{label}</button>;

const Avatar=({name,size=48,verified,badge})=><div style={{position:"relative",width:size,height:size,flexShrink:0}}><div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",background:T.gradient,display:"flex",alignItems:"center",justifyContent:"center",border:verified?`2px solid ${T.accent}`:"none"}}><span style={{fontSize:size*.4,fontWeight:700,color:"#fff"}}>{(name||"?")[0].toUpperCase()}</span></div>{verified&&<div style={{position:"absolute",bottom:-2,right:-2,width:size>50?20:16,height:size>50?20:16,borderRadius:"50%",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${T.bg}`}}><Check size={size>50?12:9} color="#fff"/></div>}{badge&&<div style={{position:"absolute",top:-4,right:-4,padding:"2px 6px",borderRadius:999,background:T.gradientHot,fontSize:10,fontWeight:700,color:"#fff"}}>{badge}</div>}</div>;

const Card=({children,style:sx,onClick,hover=true,className})=><div onClick={onClick} className={className} style={{background:T.bgCard,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:20,cursor:onClick?"pointer":"default",transition:"all .25s",...sx}} onMouseEnter={e=>{if(onClick&&hover){e.currentTarget.style.borderColor=T.primary+"55";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.shadow}}} onMouseLeave={e=>{if(onClick&&hover){e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}}>{children}</div>;

const ProgressBar=({value,max})=><div style={{width:"100%",height:4,background:T.bgInput,borderRadius:4,overflow:"hidden"}}><div style={{width:`${(value/max)*100}%`,height:"100%",borderRadius:4,background:T.gradient,transition:"width .5s ease"}}/></div>;

const Badge=({children,color=T.primary,glow})=><span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",background:color+"18",color,borderRadius:999,fontSize:11,fontWeight:600,...(glow?{boxShadow:`0 0 12px ${color}33`}:{})}}>{children}</span>;

const Sel=({label,error,value,onChange,children})=>{const[f,sf]=useState(false);return <div style={{width:"100%"}}>{label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>{label}</label>}<select value={value} onChange={onChange} onFocus={()=>sf(true)} onBlur={()=>sf(false)} style={{width:"100%",padding:"12px 16px",background:T.bgInput,border:`1.5px solid ${error?T.danger:f?T.borderFocus:T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none",appearance:"none",cursor:"pointer"}}>{children}</select>{error&&<p style={{fontSize:12,color:T.danger,marginTop:4}}>{error}</p>}</div>};

const Toggle=({on,onToggle,label})=><div onClick={onToggle} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",cursor:"pointer"}}><span style={{fontSize:14,color:T.text}}>{label}</span><div style={{width:44,height:24,borderRadius:12,background:on?T.primary:T.border,transition:"all .2s",position:"relative",padding:2}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",transition:"all .2s",transform:on?"translateX(20px)":"translateX(0)"}}/></div></div>;

// ═══ DATA ═══
const GYMS_DB=[
  {id:"g1",name:"PureGym Shoreditch",address:"123 Old Street, EC1V 9NR",postcode:"EC1V",rating:4.5,members:342,googlePlaceId:"mock_place_1",latitude:51.5255,longitude:-0.0873},
  {id:"g2",name:"The Gym Group Hackney",address:"45 Mare Street, E8 4RG",postcode:"E8",rating:4.2,members:289,googlePlaceId:"mock_place_2",latitude:51.5435,longitude:-0.0553},
  {id:"g3",name:"David Lloyd Finchley",address:"Leisure Way, N3 1BN",postcode:"N3",rating:4.7,members:518,googlePlaceId:"mock_place_3",latitude:51.5999,longitude:-0.1872},
  {id:"g4",name:"Fitness First TCR",address:"16 TCR, W1T 1BE",postcode:"W1T",rating:4.3,members:405,googlePlaceId:"mock_place_4",latitude:51.5178,longitude:-0.1312},
  {id:"g5",name:"Village Gym Watford",address:"Aldenham Rd, WD23 2TY",postcode:"WD23",rating:4.1,members:231,googlePlaceId:"mock_place_5",latitude:51.6571,longitude:-0.3961},
  {id:"g6",name:"Nuffield Health City",address:"1 Poultry, EC2R 8EJ",postcode:"EC2R",rating:4.6,members:312,googlePlaceId:"mock_place_6",latitude:51.5139,longitude:-0.0925},
  {id:"g7",name:"Anytime Fitness Camden",address:"12 Camden High St, NW1 0JH",postcode:"NW1",rating:4.0,members:198,googlePlaceId:"mock_place_7",latitude:51.5390,longitude:-0.1426},
  {id:"g8",name:"Virgin Active Barbican",address:"1 Silk Street, EC2Y 8EN",postcode:"EC2Y",rating:4.8,members:467,googlePlaceId:"mock_place_8",latitude:51.5201,longitude:-0.0936},
];

// ═══ INTEGRATION: Google Maps Gym Search ═══
// TODO: Replace with real Google Maps Platform API calls when API key is connected
// Required APIs: Geocoding API, Places API (Nearby Search), Place Details
// Flow: postcode → Geocoding API → lat/lng → Places Nearby Search (type=gym) → results
// ═══ GOOGLE MAPS: Load script + search gyms ═══
const GMAPS_KEY=typeof import.meta!=="undefined"&&import.meta.env?.VITE_GOOGLE_MAPS_API_KEY||"";
let gmapsLoaded=false;
const loadGoogleMaps=()=>new Promise((resolve)=>{
  if(gmapsLoaded&&window.google?.maps){resolve();return}
  if(!GMAPS_KEY){console.warn("No Google Maps API key");resolve();return}
  if(document.querySelector('script[src*="maps.googleapis.com"]')){
    const wait=()=>window.google?.maps?resolve():setTimeout(wait,100);wait();return;
  }
  const s=document.createElement("script");
  s.src=`https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places`;
  s.async=true;s.defer=true;
  s.onload=()=>{gmapsLoaded=true;resolve()};
  s.onerror=()=>{console.warn("Google Maps failed to load");resolve()};
  document.head.appendChild(s);
});

// UK gym chains and boutique brands to search for
const GYM_BRANDS=[
  "PureGym","The Gym Group","David Lloyd","Virgin Active","Nuffield Health",
  "Fitness First","Anytime Fitness","JD Gyms","Better Gym","énergie Fitness",
  "Bannatyne","Snap Fitness","Village Gym","Gymbox","Third Space",
  "1Rebel","Barry's","F45 Training","Orangetheory","CrossFit",
  "Blok","Frame","Psycle","Equinox","KX",
  "Trib3","Sweat It","BXR","Kobox","Flykick"
];

const searchGymsNearPostcode=async(postcode)=>{
  const pc=postcode.trim().toUpperCase();
  if(!pc)return[];

  if(GMAPS_KEY){
    try{
      await loadGoogleMaps();
      if(window.google?.maps){
        // Step 1: Geocode postcode
        const geocoder=new window.google.maps.Geocoder();
        const geoResult=await new Promise((resolve,reject)=>{
          geocoder.geocode({address:pc+", UK",componentRestrictions:{country:"GB"}},(results,status)=>{
            if(status==="OK"&&results[0])resolve(results[0].geometry.location);
            else reject(new Error("Geocode failed: "+status));
          });
        });

        const tempDiv=document.createElement("div");
        const service=new window.google.maps.places.PlacesService(tempDiv);
        const doSearch=(keyword)=>new Promise((resolve)=>{
          service.nearbySearch({location:geoResult,radius:8000,type:"gym",keyword},(results,status)=>{
            resolve(status==="OK"?results:[]);
          });
        });
        const doTextSearch=(query)=>new Promise((resolve)=>{
          service.textSearch({query:query+' near '+pc+' UK',type:"gym"},(results,status)=>{
            resolve(status==="OK"?results:[]);
          });
        });

        // Step 2: Search major chains first, then general
        const allResults=[];
        const seenIds=new Set();
        const addResults=(places)=>{
          for(const p of places){
            if(!seenIds.has(p.place_id)){
              seenIds.add(p.place_id);
              allResults.push({
                id:p.place_id,
                name:p.name,
                address:p.vicinity||"",
                postcode:pc,
                rating:p.rating||0,
                googlePlaceId:p.place_id,
                latitude:p.geometry.location.lat(),
                longitude:p.geometry.location.lng(),
              });
            }
          }
        };

        // Search each brand (batch in groups to avoid rate limits)
        const brandGroups=[];
        for(let i=0;i<GYM_BRANDS.length;i+=5){
          brandGroups.push(GYM_BRANDS.slice(i,i+5).join(" OR "));
        }
        for(const group of brandGroups){
          const r=await doSearch(group);
          addResults(r);
          if(allResults.length>=20)break;
        }

        // Also search generic gym/fitness
        if(allResults.length<20){
          const generic=await doSearch("gym fitness centre health club");
          addResults(generic);
        }

        // Text search for top brands to catch any missed by nearbySearch
        const topBrands=["PureGym","The Gym Group","David Lloyd","Virgin Active","Nuffield Health","JD Gyms","Anytime Fitness","Gymbox","Third Space"];
        for(const brand of topBrands){
          if(allResults.length>=20)break;
          const found=allResults.some(r=>r.name.toLowerCase().includes(brand.toLowerCase()));
          if(!found){
            const textR=await doTextSearch(brand);
            addResults(textR);
          }
        }

        if(allResults.length>0){
          // Sort: higher rated first
          allResults.sort((a,b)=>b.rating-a.rating);
          return allResults.slice(0,15);
        }
      }
    }catch(err){console.warn("Google Maps search error:",err)}
  }

  // FALLBACK: Filter local mock gym database
  const results=GYMS_DB.filter(g=>g.postcode.startsWith(pc.substring(0,2))||g.postcode.startsWith(pc.substring(0,3)));
  return results.length?results:GYMS_DB.slice(0,4);
};

// Search gyms using browser GPS location
const searchGymsNearLocation=async(lat,lng)=>{
  if(!GMAPS_KEY)return GYMS_DB.slice(0,6);
  try{
    await loadGoogleMaps();
    if(!window.google?.maps)return GYMS_DB.slice(0,6);
    const loc=new window.google.maps.LatLng(lat,lng);
    const tempDiv=document.createElement("div");
    const service=new window.google.maps.places.PlacesService(tempDiv);
    const doSearch=(keyword)=>new Promise(resolve=>{
      service.nearbySearch({location:loc,radius:5000,type:"gym",keyword},(r,s)=>resolve(s==="OK"?r:[]));
    });
    const doText=(query)=>new Promise(resolve=>{
      service.textSearch({query,location:loc,radius:5000,type:"gym"},(r,s)=>resolve(s==="OK"?r:[]));
    });
    const allResults=[];const seenIds=new Set();
    const add=(places)=>{for(const p of places){if(!seenIds.has(p.place_id)){seenIds.add(p.place_id);allResults.push({id:p.place_id,name:p.name,address:p.vicinity||"",postcode:"",rating:p.rating||0,googlePlaceId:p.place_id,latitude:p.geometry.location.lat(),longitude:p.geometry.location.lng()})}}};
    // Search brands
    const brandGroups=[];for(let i=0;i<GYM_BRANDS.length;i+=5)brandGroups.push(GYM_BRANDS.slice(i,i+5).join(" OR "));
    for(const g of brandGroups){add(await doSearch(g));if(allResults.length>=20)break}
    if(allResults.length<20)add(await doSearch("gym fitness centre health club"));
    // Text search top brands if missing
    for(const brand of["PureGym","The Gym Group","David Lloyd","Virgin Active","Nuffield Health","JD Gyms"]){
      if(allResults.length>=20)break;
      if(!allResults.some(r=>r.name.toLowerCase().includes(brand.toLowerCase()))){add(await doText(brand))}
    }
    allResults.sort((a,b)=>{
      const distA=Math.sqrt(Math.pow(a.latitude-lat,2)+Math.pow(a.longitude-lng,2));
      const distB=Math.sqrt(Math.pow(b.latitude-lat,2)+Math.pow(b.longitude-lng,2));
      return distA-distB;
    });
    return allResults.slice(0,15);
  }catch(err){console.warn("Location search error:",err);return GYMS_DB.slice(0,6)}
};

// ═══ INTEGRATION: ID & Selfie Verification ═══
// TODO: Replace with real verification provider SDK when connected
// Supported providers: Veriff, Stripe Identity, Onfido, Jumio, Persona, Sumsub
// Flow: user starts → provider SDK opens → user uploads ID + selfie → provider returns status
// IMPORTANT: Never store raw ID documents, passports, or selfie images in app state/database
// Only store verification metadata: status, provider, referenceId, timestamps
const VERIFICATION_STATUSES={NOT_STARTED:"not_started",PENDING:"pending",APPROVED:"approved",FAILED:"failed",MANUAL_REVIEW:"manual_review"};
const startVerification=async(userId)=>{
  // TODO: Initialize provider SDK
  // Example with Veriff:
  // const session = await fetch('https://stationapi.veriff.com/v1/sessions', {
  //   method: 'POST',
  //   headers: { 'X-AUTH-CLIENT': VERIFF_API_KEY, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ verification: { person: { firstName, lastName }, vendorData: userId } })
  // }).then(r=>r.json());
  // window.open(session.verification.url); // or use Veriff SDK inline
  // return { referenceId: session.verification.id, status: 'pending' };

  // MOCK: Simulate verification for demo/testing
  console.log("TODO: Connect real verification provider for user:",userId);
  return{referenceId:"mock-"+Date.now(),status:VERIFICATION_STATUSES.PENDING,provider:"demo"};
};
const checkVerificationStatus=async(referenceId)=>{
  // TODO: Poll provider for verification result
  // const result = await fetch(`https://stationapi.veriff.com/v1/sessions/${referenceId}/decision`, {...});
  // return { status: result.verification.status, ageConfirmed: true, nameConfirmed: true };

  // MOCK: Auto-approve for demo
  return{status:VERIFICATION_STATUSES.APPROVED,ageConfirmed:true,nameConfirmed:true};
};

// ═══ BOOKING OVERLAP CHECK ═══
const hasBookingOverlap=(newDate,newStart,newDur,existingBookings)=>{
  if(!newDate||!newStart)return null;
  const toMin=(t)=>{if(!t)return 0;const p=(t.includes(":")?t:`${t}:00`).split(":").map(Number);return(p[0]||0)*60+(p[1]||0)};
  const ns=toMin(newStart);const ne=ns+(parseInt(newDur)||60);
  for(const b of existingBookings){
    if(!b||b.status==="cancelled"||b.status==="completed"||b.status==="declined")continue;
    const bd=b.date||b.prefDate||"";const bt=b.time||b.prefTime||b.startTime||"";
    if(bd!==newDate||!bt)continue;
    const bs=toMin(bt);const be=bs+(parseInt(b.duration)||60);
    if(ns<be&&ne>bs)return b;
  }return null;
};

// ═══ CALENDAR PICKER ═══
const CalendarPicker=({value,onChange,label,minDate,maxDate})=>{
  const[vm,setVm]=useState(()=>{const d=value?new Date(value):new Date();return{y:d.getFullYear(),m:d.getMonth()}});
  const dim=new Date(vm.y,vm.m+1,0).getDate();
  const fd=new Date(vm.y,vm.m,1).getDay();const pad=fd===0?6:fd-1;
  const today=new Date().toISOString().slice(0,10);
  const mn=minDate||today;const mx=maxDate||"2099-12-31";
  return <div>
    {label&&<label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:8}}>{label}</label>}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
      <button onClick={()=>setVm(v=>({y:v.m===0?v.y-1:v.y,m:v.m===0?11:v.m-1}))} style={{background:"none",border:"none",cursor:"pointer",padding:6}}><ChevronLeft size={18} color={T.textMuted}/></button>
      <p style={{fontWeight:600,fontSize:14,color:T.text}}>{new Date(vm.y,vm.m).toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</p>
      <button onClick={()=>setVm(v=>({y:v.m===11?v.y+1:v.y,m:v.m===11?0:v.m+1}))} style={{background:"none",border:"none",cursor:"pointer",padding:6}}><ChevronRight size={18} color={T.textMuted}/></button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
      {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,fontWeight:600,color:T.textDim,padding:4}}>{d}</div>)}
      {Array.from({length:pad}).map((_,i)=><div key={"p"+i}/>)}
      {Array.from({length:dim}).map((_,i)=>{const day=i+1;const ds=`${vm.y}-${String(vm.m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;const sel=value===ds;const dis=ds<mn||ds>mx;
        return <button key={day} disabled={dis} onClick={()=>!dis&&onChange(ds)} style={{padding:"9px 4px",borderRadius:T.radiusSm,fontSize:13,fontWeight:sel?700:500,background:sel?T.primary:ds===today?T.bgInput:"transparent",color:sel?"#fff":dis?T.border:T.text,border:sel?`2px solid ${T.primary}`:"1px solid transparent",cursor:dis?"default":"pointer"}}>{day}</button>})}
    </div>
    {value&&<p style={{fontSize:12,color:T.primaryLight,marginTop:6,textAlign:"center"}}>{new Date(value).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"short"})}</p>}
  </div>;
};

const MOCK_USERS=[
  {id:"u1",name:"Alex Chen",age:28,gender:"Male",fitnessLevel:"Intermediate",gym:"g1",verified:true,bio:"Looking for a consistent training partner for push/pull/legs. I train 5x a week, mornings preferred.",matchTime:"07:00",duration:90,reliability:{completed:42,cancelledAdvance:3,noShows:0,score:97},longTerm:true,availability:{Mon:["morning"],Tue:["morning"],Wed:["morning"],Thu:["morning"],Fri:["morning"]}},
  {id:"u2",name:"Jordan Rivera",age:25,gender:"Female",fitnessLevel:"Advanced",gym:"g1",verified:true,bio:"Competitive powerlifter looking for a spotter who takes training seriously.",matchTime:"18:00",duration:75,reliability:{completed:67,cancelledAdvance:5,noShows:1,score:92},longTerm:false,availability:{Mon:["evening"],Wed:["evening"],Fri:["evening"]}},
  {id:"u3",name:"Sam Taylor",age:31,gender:"Non-binary",fitnessLevel:"Beginner",gym:"g2",verified:true,bio:"Just getting started on my fitness journey. Looking for a patient buddy!",matchTime:"10:00",duration:60,reliability:{completed:8,cancelledAdvance:1,noShows:0,score:95},longTerm:true,availability:{Tue:["morning"],Thu:["morning"],Sat:["morning","midday"]}},
  {id:"u4",name:"Morgan Lee",age:22,gender:"Male",fitnessLevel:"Intermediate",gym:"g1",verified:true,bio:"Leg day is the best day. Always down for a squat session. Consistency is key.",matchTime:"07:30",duration:60,reliability:{completed:31,cancelledAdvance:2,noShows:0,score:96},longTerm:true,availability:{Mon:["early","morning"],Wed:["morning"],Fri:["morning"],Sat:["midday"]}},
  {id:"u5",name:"Casey Kim",age:27,gender:"Female",fitnessLevel:"Advanced",gym:"g4",verified:true,bio:"CrossFit and Olympic lifting enthusiast. Looking for someone who can push me.",matchTime:"06:00",duration:90,reliability:{completed:55,cancelledAdvance:4,noShows:2,score:88},longTerm:false,availability:{Mon:["early"],Tue:["early"],Wed:["early"],Thu:["early"],Fri:["early"],Sat:["early"]}},
  {id:"u6",name:"Taylor Brooks",age:30,gender:"Male",fitnessLevel:"Intermediate",gym:"g1",verified:true,bio:"Morning gym crew. Let's build a routine together.",matchTime:"06:30",duration:60,reliability:{completed:20,cancelledAdvance:1,noShows:0,score:98},longTerm:true,availability:{Mon:["early"],Wed:["early"],Fri:["early","morning"]}},
  {id:"u7",name:"Riley Park",age:26,gender:"Female",fitnessLevel:"Beginner",gym:"g1",verified:true,bio:"New to weight training. Looking for a supportive partner.",matchTime:"17:30",duration:45,reliability:{completed:5,cancelledAdvance:0,noShows:0,score:100},longTerm:true,availability:{Tue:["afternoon","evening"],Thu:["afternoon"]}},
  {id:"u8",name:"Jamie Osei",age:33,gender:"Male",fitnessLevel:"Advanced",gym:"g2",verified:true,bio:"Bodybuilding prep. Need a serious training partner for 6-day splits.",matchTime:"18:30",duration:90,reliability:{completed:89,cancelledAdvance:6,noShows:1,score:93},longTerm:false,availability:{Mon:["evening"],Tue:["evening"],Wed:["evening"],Thu:["evening"],Fri:["evening"],Sat:["midday","afternoon"]}},
];

const MOCK_TRAINERS=[
  {id:"t1",name:"Marcus Stone",age:34,gender:"Male",specialties:["Strength","HIIT"],gyms:["g1","g2"],rate:55,bio:"10 years in strength training. Compound movements and progressive overload specialist.",verified:true,rating:4.9,clients:28,photos:3,hasVideo:true},
  {id:"t2",name:"Priya Sharma",age:29,gender:"Female",specialties:["Yoga","Mobility"],gyms:["g1","g4"],rate:45,bio:"Certified yoga instructor and mobility specialist. Move better, recover faster.",verified:true,rating:4.8,clients:35,photos:5,hasVideo:true},
  {id:"t3",name:"Jake Wilson",age:31,gender:"Male",specialties:["Boxing","Cardio"],gyms:["g2","g3"],rate:60,bio:"Former amateur boxer. High intensity sessions that push your limits.",verified:true,rating:4.6,clients:19,photos:2,hasVideo:true},
  {id:"t4",name:"Elena Rodriguez",age:27,gender:"Female",specialties:["CrossFit","Powerlifting"],gyms:["g1","g6"],rate:65,bio:"CrossFit Level 2 certified. Functional fitness and competition prep.",verified:true,rating:4.7,clients:22,photos:4,hasVideo:true},
];

const MOCK_BOOTCAMPS=[
  {id:"b1",trainerId:"t1",title:"Dawn HIIT Blast",date:"2026-05-05",time:"06:00",gym:"g1",price:15,capacity:16,spotsLeft:4,type:"HIIT",duration:45,attendees:["u2","u4","u6"]},
  {id:"b2",trainerId:"t3",title:"Boxing Fundamentals",date:"2026-05-06",time:"18:00",gym:"g2",price:20,capacity:12,spotsLeft:7,type:"Boxing",duration:60,attendees:["u3","u8"]},
  {id:"b3",trainerId:"t2",title:"Sunrise Flow Yoga",date:"2026-05-07",time:"07:00",gym:"g1",price:12,capacity:20,spotsLeft:11,type:"Yoga",duration:50,attendees:["u1"]},
];

const MOCK_GROUP=[
  {id:"gr1",trainerId:"t4",title:"Extra Spots: Functional Strength",date:"2026-05-05",time:"17:00",gym:"g1",price:25,capacity:4,spotsLeft:2,type:"CrossFit",duration:60,isFree:false,attendees:["u1","u5"]},
  {id:"gr2",trainerId:"t1",title:"Open Gym: Strength Coaching",date:"2026-05-06",time:"10:00",gym:"g2",price:0,capacity:3,spotsLeft:1,type:"Strength",duration:75,isFree:true,attendees:["u3","u7"]},
];

const FITNESS_LEVELS=["Beginner","Intermediate","Advanced","Elite"];
const SPECIALTIES=["Strength","HIIT","Yoga","Mobility","Boxing","Cardio","CrossFit","Powerlifting","Bodybuilding","Calisthenics","Swimming","Martial Arts","Dance Fitness","Rehab/Recovery"];
const GENDERS=["Male","Female","Non-binary","Prefer not to say"];
const TIME_SLOTS=[];for(let h=5;h<=22;h++)for(let m=0;m<60;m+=30){TIME_SLOTS.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);}
const DURATIONS=[30,45,60,75,90,120];

const timeToMin=t=>{const[h,m]=t.split(":").map(Number);return h*60+m;};
const getRelCat=s=>s>=95?{label:"Excellent",color:T.success}:s>=85?{label:"Good",color:T.accent}:s>=70?{label:"Fair",color:T.warning}:{label:"Needs Improvement",color:T.danger};

// ═══ PROFILE PREVIEW MODAL ═══
const ProfilePreview=({user,onConnect,onPass,onClose,connected})=>{
  if(!user)return null;
  const rel=user.reliability||{completed:0,cancelledAdvance:0,noShows:0,score:0};
  const rc=getRelCat(rel.score);
  return <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}/>
    <div className="slide-up" onClick={e=>e.stopPropagation()} style={{position:"relative",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",background:T.bg,borderRadius:"24px 24px 0 0",padding:"28px 24px 32px"}}>
      <button onClick={onClose} style={{position:"absolute",top:16,left:16,background:T.bgInput,border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><ArrowLeft size={18} color={T.textMuted}/></button>
      <div style={{textAlign:"center",marginBottom:24,paddingTop:8}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Avatar name={user.name} size={88} verified={true}/></div>
        <h2 style={{fontSize:24,fontWeight:800}}>{user.name}</h2>
        <p style={{fontSize:14,color:T.textMuted,marginTop:4}}>{user.age}y · {user.gender} · {user.fitnessLevel}</p>
        <div style={{marginTop:8}}><Badge color={T.accent} glow>Verified ✓</Badge></div>
      </div>
      <div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Bio</h4><p style={{fontSize:14,color:T.textMuted,lineHeight:1.6}}>{user.bio||"No bio."}</p></div>
      {user.matchTime&&<div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Session</h4><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Badge color={T.primary}><Clock size={12}/> {user.matchTime}</Badge><Badge color={T.primary}>{user.duration} min</Badge></div></div>}
      <div style={{marginBottom:28}}>
        <h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:12,textTransform:"uppercase",letterSpacing:".05em"}}>Reliability</h4>
        <Card style={{padding:18}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:48,height:48,borderRadius:14,background:rc.color+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:20,fontWeight:800,color:rc.color}}>{rel.score}</span></div>
            <div><p style={{fontWeight:700,fontSize:15,color:rc.color}}>{rc.label}</p><p style={{fontSize:12,color:T.textDim}}>Reliability Score</p></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{v:rel.completed,l:"Completed",c:T.success},{v:rel.cancelledAdvance,l:"Cancelled early",c:T.warning},{v:rel.noShows,l:"No-shows",c:rel.noShows>0?T.danger:T.text},{v:rc.label,l:"Category",c:rc.color}].map((x,i)=><div key={i} style={{padding:"10px 12px",background:T.bgInput,borderRadius:T.radiusSm}}><p style={{fontSize:18,fontWeight:700,color:x.c}}>{x.v}</p><p style={{fontSize:11,color:T.textDim}}>{x.l}</p></div>)}
          </div>
        </Card>
      </div>
      <div style={{display:"flex",gap:12}}>
        <Btn onClick={onPass} variant="outlineDanger" size="lg" style={{flex:1}}><X size={18}/> Pass</Btn>
        <Btn onClick={onConnect} variant={connected?"success":"primary"} size="lg" style={{flex:1}} disabled={connected}>{connected?<><Check size={18}/> Sent</>:<><Zap size={18}/> Connect</>}</Btn>
      </div>
    </div>
  </div>;
};

// ═══ TRAINER PROFILE MODAL ═══
const TrainerProfile=({trainer,onClose,onEnquiry})=>{
  if(!trainer)return null;
  const gym=trainer.gyms.map(g=>GYMS_DB.find(x=>x.id===g)).filter(Boolean);
  return <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}/>
    <div className="slide-up" onClick={e=>e.stopPropagation()} style={{position:"relative",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",background:T.bg,borderRadius:"24px 24px 0 0",padding:"28px 24px 32px"}}>
      <button onClick={onClose} style={{position:"absolute",top:16,left:16,background:T.bgInput,border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><ArrowLeft size={18} color={T.textMuted}/></button>
      <div style={{textAlign:"center",marginBottom:24,paddingTop:8}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Avatar name={trainer.name} size={88} verified={trainer.verified} badge={`£${trainer.rate}/hr`}/></div>
        <h2 style={{fontSize:24,fontWeight:800}}>{trainer.name}</h2>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:6}}><span style={{fontSize:14,color:T.warning}}>★ {trainer.rating}</span><span style={{fontSize:14,color:T.textDim}}>{trainer.clients} clients</span></div>
      </div>
      <div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Bio</h4><p style={{fontSize:14,color:T.textMuted,lineHeight:1.6}}>{trainer.bio}</p></div>
      <div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Specialties</h4><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{trainer.specialties.map(s=><Badge key={s} color={T.accent}>{s}</Badge>)}</div></div>
      {/* Video placeholder */}
      {trainer.hasVideo&&<div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Intro Video (45-60s)</h4><div style={{width:"100%",height:180,background:T.bgInput,borderRadius:T.radius,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${T.border}`}}><div style={{textAlign:"center"}}><Play size={36} color={T.primary}/><p style={{fontSize:12,color:T.textDim,marginTop:8}}>Tap to play</p></div></div></div>}
      {/* Photos placeholder */}
      {trainer.photos>0&&<div style={{marginBottom:20}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Photos ({trainer.photos})</h4><div style={{display:"flex",gap:8,overflowX:"auto"}}>{Array.from({length:trainer.photos}).map((_,i)=><div key={i} style={{width:100,height:100,background:T.bgInput,borderRadius:T.radiusSm,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${T.border}`,flexShrink:0}}><Image size={20} color={T.textDim}/></div>)}</div></div>}
      <div style={{marginBottom:24}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Locations</h4>{gym.map(g=><div key={g.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0"}}><MapPin size={14} color={T.accent}/><span style={{fontSize:13,color:T.textMuted}}>{g.name}</span></div>)}</div>
      <div style={{display:"flex",gap:12}}>
        <Btn onClick={()=>onEnquiry("enquiry")} variant="secondary" size="lg" style={{flex:1}}><Send size={16}/> Send Enquiry</Btn>
        <Btn onClick={()=>onEnquiry("session")} variant="primary" size="lg" style={{flex:1}}><Calendar size={16}/> Request Session</Btn>
      </div>
    </div>
  </div>;
};

// ═══ BOOTCAMP / GROUP JOIN MODAL ═══
const JoinModal=({item,type,onClose,onJoin})=>{
  const[anon,setAnon]=useState(false);
  if(!item)return null;
  const trainer=MOCK_TRAINERS.find(t=>t.id===item.trainerId);
  const gym=GYMS_DB.find(g=>g.id===item.gym);
  return <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}/>
    <div className="slide-up" onClick={e=>e.stopPropagation()} style={{position:"relative",width:"100%",maxWidth:480,maxHeight:"85vh",overflowY:"auto",background:T.bg,borderRadius:"24px 24px 0 0",padding:"28px 24px 32px"}}>
      <button onClick={onClose} style={{position:"absolute",top:16,left:16,background:T.bgInput,border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><ArrowLeft size={18} color={T.textMuted}/></button>
      <div style={{textAlign:"center",marginBottom:20,paddingTop:8}}>
        <h2 style={{fontSize:22,fontWeight:800}}>{item.title}</h2>
        <p style={{fontSize:14,color:T.textMuted,marginTop:4}}>{type==="bootcamp"?"Bootcamp":"Group Training"}</p>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:20}}>
        <Badge color={T.primary}><Calendar size={11}/> {item.date}</Badge>
        <Badge color={T.accent}><Clock size={11}/> {item.time}</Badge>
        <Badge color={T.accent}>{item.duration} min</Badge>
        <Badge color={item.isFree?T.success:T.warning}>{item.isFree||item.price===0?"Free":`£${item.price}`}</Badge>
        <Badge color={item.spotsLeft<=3?T.danger:T.success}>{item.spotsLeft} spots left</Badge>
      </div>
      {gym&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><MapPin size={14} color={T.accent}/><span style={{fontSize:13,color:T.textMuted}}>{gym.name} — {gym.address}</span></div>}
      <div style={{marginBottom:16}}><p style={{fontSize:13,fontWeight:600,color:T.textDim,marginBottom:6}}>Type: {item.type}</p><p style={{fontSize:13,color:T.textDim}}>Capacity: {item.capacity} · {item.capacity-item.spotsLeft} joined</p></div>
      {trainer&&<><div style={{marginBottom:16}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Trainer</h4><div style={{display:"flex",alignItems:"center",gap:12}}><Avatar name={trainer.name} size={44} verified={trainer.verified}/><div><p style={{fontWeight:600,fontSize:14}}>{trainer.name}</p><p style={{fontSize:12,color:T.textDim}}>★ {trainer.rating} · £{trainer.rate}/hr</p></div></div><p style={{fontSize:13,color:T.textMuted,marginTop:8,lineHeight:1.5}}>{trainer.bio}</p></div>
      {trainer.hasVideo&&<div style={{marginBottom:16}}><div style={{width:"100%",height:140,background:T.bgInput,borderRadius:T.radius,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${T.border}`}}><Play size={28} color={T.primary}/><p style={{fontSize:11,color:T.textDim,marginLeft:8}}>Trainer intro (45-60s)</p></div></div>}</>}
      {/* Attendees */}
      {item.attendees&&item.attendees.length>0&&<div style={{marginBottom:16}}><h4 style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8,textTransform:"uppercase",letterSpacing:".05em"}}>Attendees ({item.attendees.length})</h4><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{item.attendees.map(uid=>{const u=MOCK_USERS.find(x=>x.id===uid);return u?<div key={uid} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",background:T.bgInput,borderRadius:999}}><Avatar name={u.name} size={22} verified={true}/><span style={{fontSize:12,color:T.textMuted}}>{u.name}</span></div>:null;})}</div></div>}
      {/* Privacy notice */}
      <div style={{background:T.warning+"10",border:`1px solid ${T.warning}33`,borderRadius:T.radiusSm,padding:12,marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}><Info size={14} color={T.warning} style={{marginTop:2,flexShrink:0}}/><p style={{fontSize:12,color:T.warning,lineHeight:1.5}}>Other attendees will be able to see your profile (bio, age, gender).</p></div>
      <Toggle on={anon} onToggle={()=>setAnon(!anon)} label="Join anonymously (only name shown)"/>
      <div style={{marginTop:16}}><Btn onClick={()=>onJoin(anon)} variant="primary" size="lg" style={{width:"100%"}} disabled={item.spotsLeft===0}>{item.spotsLeft===0?"Full":"Join "+((item.isFree||item.price===0)?"Free":`— £${item.price}`)}</Btn></div>
    </div>
  </div>;
};

// ═══ CHAT MODAL ═══
const ChatModal=({user,onClose})=>{
  const[msgs,setMsgs]=useState([{from:"them",text:`Hey! Ready to train together?`,ts:"Just now"}]);
  const[draft,setDraft]=useState("");
  const sendMsg=()=>{if(!draft.trim())return;setMsgs(m=>[...m,{from:"me",text:draft.trim(),ts:"Now"}]);setDraft("");};
  return <div style={{position:"fixed",inset:0,zIndex:200,background:T.bg,display:"flex",flexDirection:"column"}}>
    <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12}}>
      <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><ArrowLeft size={20} color={T.textMuted}/></button>
      <Avatar name={user.name} size={36} verified={true}/>
      <div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{user.name}</p><p style={{fontSize:11,color:T.textDim}}>Verified · {user.fitnessLevel}</p></div>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:12}}>
      {msgs.map((m,i)=><div key={i} style={{alignSelf:m.from==="me"?"flex-end":"flex-start",maxWidth:"75%"}}><div style={{padding:"10px 14px",borderRadius:14,background:m.from==="me"?T.primary:T.bgCard,color:m.from==="me"?"#fff":T.text,fontSize:14,lineHeight:1.5}}>{m.text}</div><p style={{fontSize:10,color:T.textDim,marginTop:4,textAlign:m.from==="me"?"right":"left"}}>{m.ts}</p></div>)}
    </div>
    <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`,display:"flex",gap:10}}>
      <input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Type a message..." style={{flex:1,padding:"10px 14px",background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none"}}/>
      <Btn onClick={sendMsg} size="sm" disabled={!draft.trim()}><Send size={16}/></Btn>
    </div>
  </div>;
};

// ═══ ONBOARDING (kept from v2, compact) ═══
const OnboardingFlow=({onComplete})=>{
  const[role,setRole]=useState(null);
  const[step,setStep]=useState(0);
  const[ak,sak]=useState(0);
  const[p,sp]=useState({name:"",firstName:"",lastName:"",age:"",gender:"",fitnessLevel:"",specialties:[],idUploaded:false,selfieUploaded:false,bio:"",prefFitnessLevels:[],prefGenders:[],prefAgeMin:"18",prefAgeMax:"60",postcode:"",gyms:[],homeGym:"",rate:"",safetyAccepted:false,verificationStatus:"not_started",verificationProvider:"",verificationRefId:"",verifiedAt:"",ageConfirmed:false,nameConfirmed:false});
  const[err,setErr]=useState({});
  const[gymR,setGymR]=useState([]);
  const[sp2,setSp2]=useState(false);
  const up=useCallback((k,v)=>sp(x=>({...x,[k]:v})),[]);
  if(!role)return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,background:T.bg}}><div className="fade-in-up" style={{textAlign:"center",maxWidth:440,width:"100%"}}><div style={{marginBottom:40}}><div style={{width:80,height:80,borderRadius:24,background:T.gradient,margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 40px ${T.primaryGlow}`,animation:"glow 3s ease infinite"}}><Dumbbell size={36} color="#fff"/></div><h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-.03em",background:T.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GymLink</h1><p style={{color:T.textMuted,marginTop:8,fontSize:15,lineHeight:1.5}}>Find your perfect gym partner<br/>or connect with expert trainers</p></div><div style={{display:"flex",flexDirection:"column",gap:16}}><Card onClick={()=>setRole("member")} style={{display:"flex",alignItems:"center",gap:16,padding:24}}><div style={{width:56,height:56,borderRadius:16,background:T.primary+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Users size={26} color={T.primary}/></div><div style={{textAlign:"left",flex:1}}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>Gym Member</h3><p style={{fontSize:13,color:T.textMuted,lineHeight:1.4}}>Find workout partners, match by fitness level & schedule</p></div><ChevronRight size={20} color={T.textDim}/></Card><Card onClick={()=>setRole("trainer")} style={{display:"flex",alignItems:"center",gap:16,padding:24}}><div style={{width:56,height:56,borderRadius:16,background:T.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Award size={26} color={T.accent}/></div><div style={{textAlign:"left",flex:1}}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>Personal Trainer</h3><p style={{fontSize:13,color:T.textMuted,lineHeight:1.4}}>Showcase expertise, manage clients across gyms</p></div><ChevronRight size={20} color={T.textDim}/></Card></div></div></div>;

  const mS=["safety","basics","fitness","bio","verification","preferences","gym","complete"];
  const tS=["safety","basics","fitness_trainer","verification","gyms_trainer","rate_bio","complete"];
  const steps=role==="member"?mS:tS,total=steps.length,cur=steps[step];
  const goN=()=>{setStep(s=>Math.min(s+1,total-1));setErr({});sak(k=>k+1)};
  const goB=()=>{setStep(s=>Math.max(s-1,0));setErr({});sak(k=>k+1)};
  const val=()=>{const e={};if(cur==="safety"&&!p.safetyAccepted)e.safety="Required";if(cur==="basics"){if(!p.firstName.trim())e.firstName="First name required";if(!p.lastName.trim())e.lastName="Last name required";if(!p.age||isNaN(+p.age)||+p.age<18)e.age="You must be at least 18";if(+p.age>99)e.age="Enter a valid age";if(!p.gender)e.gender="Required";}if(cur==="fitness"&&!p.fitnessLevel)e.fl="Required";if(cur==="fitness_trainer"){if(!p.fitnessLevel)e.fl="Required";if(!p.specialties.length)e.sp="Required";}if(cur==="bio"&&role==="member"&&!p.bio.trim())e.bio="Required";if(cur==="verification"){if(!p.idUploaded)e.id="Required";if(!p.selfieUploaded)e.selfie="Required";}if(cur==="preferences"){const mn=parseInt(p.prefAgeMin),mx=parseInt(p.prefAgeMax);if(p.prefAgeMin&&p.prefAgeMax&&mn>mx)e.age="Min > Max";}if((cur==="gym"||cur==="gyms_trainer")&&!p.gyms.length)e.gym="Required";if((cur==="gym"||cur==="gyms_trainer")&&!p.homeGym)e.hg="Required";if(cur==="rate_bio"){if(!p.rate||+p.rate<1)e.rate="Required";if(!p.bio.trim())e.bio="Required";}setErr(e);return !Object.keys(e).length;};
  const hN=()=>{if(val())goN()};
  const sG=async()=>{const results=await searchGymsNearPostcode(p.postcode);setGymR(results);setSp2(true)};
  const tG=gId=>sp(x=>{const has=x.gyms.includes(gId);return{...x,gyms:has?x.gyms.filter(i=>i!==gId):[...x.gyms,gId],homeGym:has&&x.homeGym===gId?"":x.homeGym}});
  const sHG=gId=>{if(p.gyms.includes(gId))sp(x=>({...x,homeGym:gId}))};
  const SI=({icon:I,color,title,sub})=><div style={{textAlign:"center",marginBottom:28}}><div style={{width:64,height:64,borderRadius:20,background:color+"18",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><I size={30} color={color}/></div><h2 style={{fontSize:24,fontWeight:800}}>{title}</h2>{sub&&<p style={{color:T.textMuted,marginTop:8,fontSize:14,lineHeight:1.5}}>{sub}</p>}</div>;

  const gymList=(results)=><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24,maxHeight:280,overflowY:"auto"}}>{results.map(gym=>{const sel=p.gyms.includes(gym.id),isH=p.homeGym===gym.id;return <Card key={gym.id} style={{padding:14,borderColor:sel?T.primary:T.border,background:sel?T.primary+"08":T.bgCard}}><div style={{display:"flex",alignItems:"center",gap:12}}><div onClick={()=>tG(gym.id)} style={{cursor:"pointer",flex:1,display:"flex",alignItems:"center",gap:12}}><div style={{width:22,height:22,borderRadius:6,border:`2px solid ${sel?T.primary:T.border}`,background:sel?T.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<Check size={14} color="#fff"/>}</div><div><p style={{fontWeight:600,fontSize:13}}>{gym.name}</p><p style={{fontSize:11,color:T.textDim}}>{gym.address}</p></div></div>{sel&&<button onClick={e=>{e.stopPropagation();sHG(gym.id)}} style={{padding:"4px 10px",borderRadius:999,fontSize:11,fontWeight:600,cursor:"pointer",background:isH?T.accent+"22":"transparent",color:isH?T.accent:T.textDim,border:`1.5px solid ${isH?T.accent:T.border}`,whiteSpace:"nowrap"}}>{isH?"🏠 Home":"Set Home"}</button>}</div></Card>})}</div>;

  const rc=()=>{switch(cur){
    case"safety":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Shield} color={T.danger} title="Safety First" sub="Read and accept our safety policy"/><Card style={{maxHeight:240,overflow:"auto",marginBottom:20,padding:20}}><div style={{fontSize:13,color:T.textMuted,lineHeight:1.8}}><p style={{fontWeight:600,color:T.text,marginBottom:10,fontSize:14}}>GymLink Community Safety Policy</p>{["Respectful Behaviour — No harassment or discrimination.","Meeting Safety — Always meet at agreed gym during staffed hours.","Mandatory Verification — Photo ID + selfie required for all users.","Reporting — Report issues immediately. 24hr review.","Data Privacy — Encrypted, never shared. Delete any time.","Zero Tolerance — Non-fitness solicitation = permanent ban."].map((t,i)=><p key={i} style={{marginBottom:8}}>{i+1}. {t}</p>)}</div></Card><label onClick={()=>up("safetyAccepted",!p.safetyAccepted)} style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",padding:"12px 16px",background:p.safetyAccepted?T.success+"12":T.bgInput,borderRadius:T.radiusSm,border:`1.5px solid ${p.safetyAccepted?T.success:T.border}`,marginBottom:20}}><div style={{width:22,height:22,borderRadius:6,border:`2px solid ${p.safetyAccepted?T.success:T.border}`,background:p.safetyAccepted?T.success:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{p.safetyAccepted&&<Check size={14} color="#fff"/>}</div><span style={{fontSize:14,color:p.safetyAccepted?T.text:T.textMuted}}>I accept the safety policy</span></label><Btn onClick={hN} size="lg" style={{width:"100%"}} disabled={!p.safetyAccepted}>Accept & Continue</Btn></div>;
    case"basics":const trainerGenders=["Male","Female","Other"];const genderOpts=role==="trainer"?trainerGenders:GENDERS;return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={User} color={T.primary} title="About You" sub="Basic info"/><div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:28}}><div style={{display:"flex",gap:12}}><Input label="First Name" placeholder="e.g. Alex" value={p.firstName} error={err.firstName} onChange={e=>up("firstName",e.target.value)} containerStyle={{flex:1}}/><Input label="Last Name" placeholder="e.g. Chen" value={p.lastName} error={err.lastName} onChange={e=>up("lastName",e.target.value)} containerStyle={{flex:1}}/></div><div style={{display:"flex",gap:16,flexWrap:"wrap"}}><Input label="Age" inputMode="numeric" pattern="[0-9]*" placeholder="18" value={p.age} error={err.age} onChange={e=>{const v=e.target.value.replace(/[^0-9]/g,"");up("age",v)}} containerStyle={{flex:"0 0 100px"}}/><div style={{flex:1,minWidth:200}}><label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>Gender{role==="trainer"?" (required)":""}</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{genderOpts.map(g=><Chip key={g} label={g} selected={p.gender===g} onClick={()=>up("gender",g)}/>)}</div>{err.gender&&<p style={{fontSize:12,color:T.danger,marginTop:4}}>{err.gender}</p>}</div></div></div><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"fitness":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Activity} color={T.accent} title="Fitness Level"/><div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>{FITNESS_LEVELS.map(l=>{const s=p.fitnessLevel===l,ic={Beginner:"🌱",Intermediate:"💪",Advanced:"🔥",Elite:"⚡"};return <Card key={l} onClick={()=>up("fitnessLevel",l)} style={{display:"flex",alignItems:"center",gap:16,padding:16,borderColor:s?T.primary:T.border,background:s?T.primary+"08":T.bgCard}}><span style={{fontSize:26}}>{ic[l]}</span><p style={{flex:1,fontWeight:600,fontSize:15,color:s?T.text:T.textMuted}}>{l}</p>{s&&<Check size={20} color={T.primary}/>}</Card>})}</div>{err.fl&&<p style={{fontSize:12,color:T.danger,marginBottom:12}}>{err.fl}</p>}<p style={{fontSize:12,color:T.textDim,textAlign:"center",marginBottom:16}}>Change later in Profile Settings</p><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"bio":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Edit} color={T.primaryLight} title="Your Bio" sub="Tell potential partners about yourself"/><TextArea label="Bio" value={p.bio} error={err.bio} placeholder="I'm looking for a long-term gym partner to stay consistent and push each other." onChange={e=>up("bio",e.target.value)} style={{minHeight:120}}/><p style={{fontSize:12,color:T.textDim,marginTop:8,marginBottom:24}}>Editable later in Profile Settings</p><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"fitness_trainer":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Target} color={T.accent} title="Expertise"/><div style={{marginBottom:20}}><label style={{fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:10,display:"block"}}>Fitness Level</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{FITNESS_LEVELS.map(l=><Chip key={l} label={l} selected={p.fitnessLevel===l} onClick={()=>up("fitnessLevel",l)}/>)}</div></div><div style={{marginBottom:28}}><label style={{fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:10,display:"block"}}>Specialties</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{SPECIALTIES.map(s=><Chip key={s} label={s} selected={p.specialties.includes(s)} onClick={()=>sp(x=>({...x,specialties:x.specialties.includes(s)?x.specialties.filter(i=>i!==s):[...x.specialties,s]}))}/>)}</div></div><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"verification":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Camera} color={T.warning} title="Verify Identity" sub="Mandatory to use GymLink"/><div style={{background:T.warning+"10",border:`1px solid ${T.warning}33`,borderRadius:T.radiusSm,padding:14,marginBottom:20}}><p style={{fontSize:13,color:T.warning,lineHeight:1.6}}>ID and selfie verification helps keep GymLink safer. Verification must be completed before using matching, chat or bookings.</p></div><div style={{background:T.danger+"10",border:`1px solid ${T.danger}33`,borderRadius:T.radiusSm,padding:12,marginBottom:20,display:"flex",gap:10}}><AlertTriangle size={14} color={T.danger} style={{marginTop:2,flexShrink:0}}/><p style={{fontSize:12,color:T.danger,lineHeight:1.5}}>Both required. Without verification you cannot match, connect, or chat.</p></div><div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:16}}><Card onClick={()=>{if(!p.idUploaded){/* TODO: Open verification provider SDK for ID upload */up("idUploaded",true);up("verificationProvider","demo");up("verificationRefId","mock-"+Date.now())}}} style={{display:"flex",alignItems:"center",gap:14,padding:18,borderColor:p.idUploaded?T.success:err.id?T.danger:T.border}}><div style={{width:48,height:48,borderRadius:14,background:p.idUploaded?T.success+"22":T.bgInput,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.idUploaded?<Check size={22} color={T.success}/>:<CreditCard size={22} color={T.textMuted}/>}</div><div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{p.idUploaded?"ID Verified ✓":"Verify Photo ID"}</p><p style={{fontSize:11,color:T.textDim}}>Licence, passport, or national ID — processed by secure provider</p></div></Card><Card onClick={()=>{if(!p.selfieUploaded){/* TODO: Open verification provider SDK for selfie/liveness check */up("selfieUploaded",true);up("verificationStatus","approved");up("verifiedAt",new Date().toISOString());up("ageConfirmed",true)}}} style={{display:"flex",alignItems:"center",gap:14,padding:18,borderColor:p.selfieUploaded?T.success:err.selfie?T.danger:T.border}}><div style={{width:48,height:48,borderRadius:14,background:p.selfieUploaded?T.success+"22":T.bgInput,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.selfieUploaded?<Check size={22} color={T.success}/>:<Camera size={22} color={T.textMuted}/>}</div><div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{p.selfieUploaded?"Selfie Verified ✓":"Complete Selfie Check"}</p><p style={{fontSize:11,color:T.textDim}}>Live selfie for identity matching — no images stored in app</p></div></Card></div><p style={{fontSize:11,color:T.textDim,textAlign:"center",marginBottom:16}}>Your ID documents are processed by a secure third-party provider and never stored in GymLink.</p><Btn onClick={hN} size="lg" style={{width:"100%"}} disabled={!p.idUploaded||!p.selfieUploaded}>Continue <ChevronRight size={18}/></Btn></div>;
    case"preferences":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Filter} color={T.primaryLight} title="Partner Preferences"/><div style={{marginBottom:20}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Fitness Level(s)</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{FITNESS_LEVELS.map(l=><Chip key={l} label={l} selected={p.prefFitnessLevels.includes(l)} onClick={()=>sp(x=>({...x,prefFitnessLevels:x.prefFitnessLevels.includes(l)?x.prefFitnessLevels.filter(i=>i!==l):[...x.prefFitnessLevels,l]}))}/>)}</div><p style={{fontSize:11,color:T.textDim,marginTop:6}}>Leave empty = any</p></div><div style={{marginBottom:20}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Gender(s)</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{GENDERS.slice(0,3).map(g=><Chip key={g} label={g} selected={p.prefGenders.includes(g)} onClick={()=>sp(x=>({...x,prefGenders:x.prefGenders.includes(g)?x.prefGenders.filter(i=>i!==g):[...x.prefGenders,g]}))}/>)}</div></div><div style={{marginBottom:28}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Age Range</label><div style={{display:"flex",gap:12,alignItems:"center"}}><Input label="Min" type="number" value={p.prefAgeMin} onChange={e=>up("prefAgeMin",e.target.value)} containerStyle={{flex:1}}/><span style={{color:T.textDim,marginTop:20}}>—</span><Input label="Max" type="number" value={p.prefAgeMax} onChange={e=>up("prefAgeMax",e.target.value)} containerStyle={{flex:1}}/></div>{err.age&&<p style={{fontSize:12,color:T.danger,marginTop:4}}>{err.age}</p>}</div><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"gym":case"gyms_trainer":const searchByLocation=async()=>{if(!navigator.geolocation){alert("Location not supported by your browser");return}navigator.geolocation.getCurrentPosition(async(pos)=>{const results=await searchGymsNearLocation(pos.coords.latitude,pos.coords.longitude);setGymR(results);setSp2(true)},()=>alert("Location access denied. Please use postcode instead."),{enableHighAccuracy:true})};return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={MapPin} color={T.success} title={cur==="gym"?"Find Your Gym":"Select Gyms"}/><div style={{display:"flex",gap:10,marginBottom:12}}><Input placeholder="e.g. EC1V" value={p.postcode} onChange={e=>up("postcode",e.target.value)} onKeyDown={e=>e.key==="Enter"&&sG()} containerStyle={{flex:1}}/><Btn onClick={sG} variant="secondary" style={{flexShrink:0}}><Search size={18}/></Btn></div><Btn onClick={searchByLocation} variant="outline" size="sm" style={{width:"100%",marginBottom:20}}><MapPin size={14}/> Use my location</Btn>{sp2&&gymR.length>0&&gymList(gymR)}{sp2&&!gymR.length&&<p style={{textAlign:"center",color:T.textDim,fontSize:14,marginBottom:20}}>No gyms found.</p>}{err.gym&&<p style={{fontSize:12,color:T.danger,marginBottom:8}}>{err.gym}</p>}{err.hg&&<p style={{fontSize:12,color:T.danger,marginBottom:8}}>{err.hg}</p>}<Btn onClick={hN} size="lg" style={{width:"100%"}} disabled={!p.gyms.length}>Continue <ChevronRight size={18}/></Btn></div>;
    case"rate_bio":return <div key={ak} className="fade-in" style={{maxWidth:480,width:"100%",margin:"0 auto"}}><SI icon={Briefcase} color={T.warning} title="Rate & Bio"/><div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:28}}><div><label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>Hourly Rate (£)</label><Input type="number" placeholder="55" value={p.rate} error={err.rate} onChange={e=>up("rate",e.target.value)} sx={{paddingLeft:32}}/></div><TextArea label="Bio" value={p.bio} error={err.bio} onChange={e=>up("bio",e.target.value)} placeholder="Your experience and style..."/></div><Btn onClick={hN} size="lg" style={{width:"100%"}}>Continue <ChevronRight size={18}/></Btn></div>;
    case"complete":return <div key={ak} className="scale-in" style={{maxWidth:440,width:"100%",margin:"0 auto",textAlign:"center"}}><div style={{width:96,height:96,borderRadius:32,background:T.gradient,margin:"0 auto 24px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 60px ${T.primaryGlow}`,animation:"glow 2s ease infinite"}}><Check size={44} color="#fff"/></div><h2 style={{fontSize:28,fontWeight:800,marginBottom:8}}>You're All Set!</h2><p style={{color:T.textMuted,fontSize:15,marginBottom:24}}>{role==="member"?"Discover gym partners near you.":"Your trainer profile is live."}</p><Btn onClick={()=>onComplete({...p,name:`${p.firstName} ${p.lastName}`.trim(),role,verified:true})} size="lg" style={{width:"100%"}}>{role==="member"?"Discover Partners":"Open Dashboard"} <ArrowRight size={18}/></Btn></div>;
    default:return null;
  }};

  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",background:T.bg}}><div style={{maxWidth:520,width:"100%"}}><div style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>{step>0&&cur!=="complete"?<button onClick={goB} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13}}><ChevronLeft size={16}/> Back</button>:<div/>}{cur!=="complete"&&<span style={{fontSize:13,color:T.textDim}}>{step+1}/{total}</span>}</div>{cur!=="complete"&&<ProgressBar value={step+1} max={total}/>}</div>{rc()}</div></div>;
};

// ═══ DISCOVER SCREEN ═══
const DiscoverScreen=({userProfile,sentRequests,onSendRequest,confirmedMatches,ltSentRequests=[],setLtSentRequests,ltConfirmedMatches=[],setLtConfirmedMatches})=>{
  const[mode,setMode]=useState(null);
  const[futureDate,setFutureDate]=useState("");
  const[sGym,setSGym]=useState(userProfile.homeGym||"");
  const[sTime,setSTime]=useState("");
  const[sDur,setSDur]=useState("");
  const[showR,setShowR]=useState(false);
  const[search,setSearch]=useState("");
  const[preview,setPreview]=useState(null);
  const[page,setPage]=useState(0);
  const[passed,setPassed]=useState([]);
  const[chat,setChat]=useState(null);
  const homeGymData=userProfile.homeGym?GYMS_DB.find(g=>g.id===userProfile.homeGym):null;

  // Long-term partner state (moved from TrainersScreen)
  const[ltFilters,setLtFilters]=useState({fitnessLevel:"",gender:"",ageMin:"",ageMax:"",schedule:{}});
  const[ltSearched,setLtSearched]=useState(false);
  const[ltAutoAccept,setLtAutoAccept]=useState(true);
  const[ltChat,setLtChat]=useState(null);
  const[ltToast,setLtToast]=useState(null);
  const[expandedDay,setExpandedDay]=useState(null);
  const LT_DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const LT_TIME_RANGES=[{v:"early",l:"Early 5–8am"},{v:"morning",l:"Morning 8am–12pm"},{v:"midday",l:"Midday 12–3pm"},{v:"afternoon",l:"Afternoon 3–6pm"},{v:"evening",l:"Evening 6–10pm"},{v:"late",l:"Late 10pm+"}];
  const LT_TIME_LABELS={early:"Early 5–8am",morning:"Morning 8am–12pm",midday:"Midday 12–3pm",afternoon:"Afternoon 3–6pm",evening:"Evening 6–10pm",late:"Late 10pm+"};
  const toggleLtDay=d=>{setLtFilters(f=>{const s={...f.schedule};if(s[d]){delete s[d]}else{s[d]=[]}return{...f,schedule:s}});setExpandedDay(x=>x===d?null:d)};
  const toggleLtDayTime=(d,t)=>{setLtFilters(f=>{const s={...f.schedule};const times=s[d]||[];s[d]=times.includes(t)?times.filter(x=>x!==t):[...times,t];return{...f,schedule:s}})};
  const hasScheduleOverlap=(userAvail,filterSchedule)=>{if(!filterSchedule||!Object.keys(filterSchedule).length)return true;if(!userAvail)return false;return Object.keys(filterSchedule).some(day=>{if(!userAvail[day])return false;const filterTimes=filterSchedule[day]||[];if(!filterTimes.length)return true;return filterTimes.some(t=>userAvail[day].includes(t))})};
  const myGymIds=userProfile.gyms||[];
  const ltPartners=MOCK_USERS.filter(u=>{if(!myGymIds.includes(u.gym)||!u.longTerm)return false;if(ltFilters.fitnessLevel&&u.fitnessLevel!==ltFilters.fitnessLevel)return false;if(ltFilters.gender&&u.gender!==ltFilters.gender)return false;if(ltFilters.ageMin&&u.age<parseInt(ltFilters.ageMin))return false;if(ltFilters.ageMax&&u.age>parseInt(ltFilters.ageMax))return false;if(!hasScheduleOverlap(u.availability,ltFilters.schedule))return false;return true});
  const ltPartnersWithStrength=ltPartners.map(u=>{const sched=ltFilters.schedule;const schedDays=Object.keys(sched);if(schedDays.length===0||!u.availability)return{...u,matchStrength:"Possible",overlapDesc:"Same gym, similar profile",overlapCount:0};const overlaps=[];schedDays.forEach(day=>{if(!u.availability[day])return;const filterTimes=sched[day]||[];if(filterTimes.length===0){overlaps.push(`${day}: Any time`);return}const matching=filterTimes.filter(t=>u.availability[day].includes(t));matching.forEach(t=>overlaps.push(`${day} ${LT_TIME_LABELS[t]||t}`))});const count=overlaps.length;const strength=count>=3?"Strong":count>=2?"Good":"Possible";const desc=overlaps.length>0?`Matches you on ${overlaps.join(", ")}`:"Same gym, similar profile";return{...u,matchStrength:strength,overlapDesc:desc,overlapCount:count}}).sort((a,b)=>(b.overlapCount||0)-(a.overlapCount||0));
  const handleLtRequest=(u)=>{if(ltSentRequests.find(r=>r.id===u.id))return;if(setLtSentRequests)setLtSentRequests(r=>[...r,u]);if(ltAutoAccept){const record={...u,sessionKey:`lt-${u.id}`,sessionType:"longTerm",status:"accepted"};if(setLtConfirmedMatches)setLtConfirmedMatches(c=>[...c,record]);setLtToast(u.name);setTimeout(()=>{setLtToast(null);setLtChat(u)},1200)}};

  const canP=()=>{if(mode==="future"&&!futureDate)return false;return sGym&&sTime&&sDur;};

  // TIME-BASED MATCHING: ±30min, preference-aware, members only
  const selectedMin=sTime?timeToMin(sTime):0;
  const prefFL=userProfile.prefFitnessLevels||[];
  const prefGn=userProfile.prefGenders||[];
  const prefAgeMin=parseInt(userProfile.prefAgeMin)||0;
  const prefAgeMax=parseInt(userProfile.prefAgeMax)||999;

  const[expandTime,setExpandTime]=useState(false);
  const[showNearby,setShowNearby]=useState(false);
  const[widenPrefs,setWidenPrefs]=useState(false);

  // Tiered matching: returns matches with reason labels
  const getMatches=()=>{
    if(!sGym||!sTime)return[];
    const selMin=timeToMin(sTime);
    const baseFilter=(u,gymId,skipPrefs)=>{
      if(!u.verified)return false;
      if(u.gym!==gymId)return false;
      if(u.id===userProfile.id)return false;
      if(passed.includes(u.id))return false;
      if(search&&!u.name.toLowerCase().includes(search.toLowerCase())&&!u.fitnessLevel.toLowerCase().includes(search.toLowerCase()))return false;
      if(!skipPrefs){
        if(prefFL.length>0&&!prefFL.includes(u.fitnessLevel))return false;
        if(prefGn.length>0&&!prefGn.includes(u.gender))return false;
        if(u.age<prefAgeMin||u.age>prefAgeMax)return false;
      }
      return true;
    };
    const addReason=(u,gymId,selMin)=>{
      const uMin=timeToMin(u.matchTime);const diff=Math.abs(uMin-selMin);
      const uGym=GYMS_DB.find(g=>g.id===u.gym);
      const sameGym=u.gym===gymId;
      if(sameGym&&diff===0)return{...u,matchReason:"Same gym, same time",matchTier:1};
      if(sameGym&&diff<=30)return{...u,matchReason:`Same gym, ${diff} min ${uMin>selMin?"later":"earlier"}`,matchTier:2};
      if(sameGym&&diff<=60)return{...u,matchReason:`Same gym, ${diff} min ${uMin>selMin?"later":"earlier"}`,matchTier:3};
      if(sameGym&&diff<=120)return{...u,matchReason:`Same gym, ~${Math.round(diff/60)}hr ${uMin>selMin?"later":"earlier"}`,matchTier:4};
      if(!sameGym)return{...u,matchReason:`Nearby gym (${uGym?.name||"other"}), similar time`,matchTier:5};
      return{...u,matchReason:"Potential match",matchTier:6};
    };
    let results=[];
    // Tier 1-4: same gym, progressively wider time
    const timeWindows=expandTime?[30,60,120]:[30,60];
    for(const tw of timeWindows){
      const tier=MOCK_USERS.filter(u=>{
        if(!baseFilter(u,sGym,widenPrefs))return false;
        return Math.abs(timeToMin(u.matchTime)-selMin)<=tw;
      }).map(u=>addReason(u,sGym,selMin)).filter(u=>!results.find(r=>r.id===u.id));
      results=[...results,...tier];
      if(results.length>=6)break;
    }
    // Tier 5: nearby gyms
    const selectedGymData=GYMS_DB.find(g=>g.id===sGym);
    if((results.length<3||showNearby)&&selectedGymData){
      const nearIds=GYMS_DB.filter(g=>g.id!==sGym&&g.postcode.substring(0,2)===selectedGymData.postcode.substring(0,2)).map(g=>g.id);
      for(const ngId of nearIds){
        const nearby=MOCK_USERS.filter(u=>{
          if(!baseFilter(u,ngId,widenPrefs))return false;
          return Math.abs(timeToMin(u.matchTime)-selMin)<=(expandTime?120:60);
        }).map(u=>addReason(u,ngId,selMin)).filter(u=>!results.find(r=>r.id===u.id));
        results=[...results,...nearby];
      }
    }
    results.sort((a,b)=>a.matchTier-b.matchTier);
    return results;
  };
  const allMatches=getMatches();
  const showNearbyFallback=allMatches.length>0&&allMatches.every(u=>u.gym!==sGym);

  // LIMIT TO 3 PER PAGE
  const pageMatches=allMatches.slice(page*3,(page+1)*3);
  const hasMore=allMatches.length>(page+1)*3;

  const[confirmToast,setConfirmToast]=useState(null);
  // Build session context for current search
  const sessionCtx={sessionType:mode||"today",date:mode==="future"?futureDate:new Date().toISOString().slice(0,10),time:sTime,gymId:sGym};
  const makeKey=(u)=>`${u.id}-${sessionCtx.sessionType}-${sessionCtx.date}-${sessionCtx.time}-${sessionCtx.gymId}`;
  const handleConnect=(u)=>{
    onSendRequest(u,sessionCtx);
    setPreview(null);
    setConfirmToast(u.name);
    setTimeout(()=>{setConfirmToast(null);setChat(u)},1200);
  };
  const handlePass=(u)=>{setPassed(x=>[...x,u.id]);setPreview(null);if(pageMatches.length<=1&&hasMore)setPage(pg=>pg+1)};

  if(chat)return <ChatModal user={chat} onClose={()=>setChat(null)}/>;
  if(ltChat)return <ChatModal user={ltChat} onClose={()=>setLtChat(null)}/>;

  if(showR){const selGym=GYMS_DB.find(g=>g.id===sGym);return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {confirmToast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>GymLink confirmed with {confirmToast}. Chat opening...</div>}
    {preview&&<ProfilePreview user={preview} onConnect={()=>handleConnect(preview)} onPass={()=>handlePass(preview)} onClose={()=>setPreview(null)} connected={sentRequests.some(r=>r.sessionKey===makeKey(preview))}/>}<div style={{marginBottom:20}}><button onClick={()=>{setShowR(false);setPage(0);setPassed([])}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:12}}><ChevronLeft size={16}/> Back</button><h1 style={{fontSize:22,fontWeight:800}}>Matches Found</h1><p style={{color:T.textMuted,fontSize:13,marginTop:4}}>{mode==="today"?"GymLink for today":"GymLink for future date"}</p><div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:8}}>{selGym&&<Badge color={T.primary}><MapPin size={11}/> {selGym.name}</Badge>}<Badge color={T.accent}><Clock size={11}/> {sTime}</Badge><Badge color={T.accent}>{sDur} min</Badge>{mode==="future"&&futureDate&&<Badge color={T.warning}><Calendar size={11}/> {new Date(futureDate).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</Badge>}</div></div>
    <div style={{position:"relative",marginBottom:20}}><Search size={18} color={T.textDim} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/><input placeholder="Filter by name or level..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",padding:"12px 16px 12px 42px",background:T.bgInput,border:`1.5px solid ${T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none"}}/></div>
    {pageMatches.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p style={{fontSize:15,marginBottom:8}}>No partners found yet.</p><p style={{fontSize:13,marginBottom:16}}>Try widening your time range, gym area, or preferences.</p><div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"center"}}>{!expandTime&&<Btn onClick={()=>setExpandTime(true)} variant="outline" size="sm">Expand time to ±2 hours</Btn>}{!showNearby&&<Btn onClick={()=>setShowNearby(true)} variant="outline" size="sm">Show nearby gyms</Btn>}{!widenPrefs&&(prefFL.length>0||prefGn.length>0)&&<Btn onClick={()=>setWidenPrefs(true)} variant="outline" size="sm">Widen preferences</Btn>}{passed.length>0&&<Btn onClick={()=>{setPassed([]);setPage(0)}} variant="ghost" size="sm">Reset passed users</Btn>}</div></div>:
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
    {showNearbyFallback&&<div style={{background:T.warning+"10",border:`1px solid ${T.warning}33`,borderRadius:T.radiusSm,padding:12,marginBottom:4,display:"flex",gap:10,alignItems:"flex-start"}}><Info size={14} color={T.warning} style={{marginTop:2,flexShrink:0}}/><p style={{fontSize:13,color:T.warning,lineHeight:1.5}}>No exact matches at selected gym. Showing partners at nearby gyms.</p></div>}
    {pageMatches.map((u,i)=>{const uGym=GYMS_DB.find(g=>g.id===u.gym);const rc=u.reliability?getRelCat(u.reliability.score):null;const sk=makeKey(u);const isSent=sentRequests.some(r=>r.sessionKey===sk);const isAccepted=confirmedMatches.some(r=>r.sessionKey===sk);return <Card key={u.id} className="fade-in-up" style={{animationDelay:`${i*.06}s`,padding:18,position:"relative"}}>
      {isSent&&!isAccepted&&<div style={{position:"absolute",top:12,right:12}}><Badge color={T.warning}>Request Sent</Badge></div>}
      {isAccepted&&<div style={{position:"absolute",top:12,right:12}}><Badge color={T.success} glow>Accepted</Badge></div>}
      <div onClick={()=>setPreview(u)} style={{display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
        <Avatar name={u.name} size={50} verified={true}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><p style={{fontWeight:600,fontSize:15}}>{u.name}</p><Badge color={T.success} glow>{u.matchTime}</Badge></div>
          <p style={{fontSize:13,color:T.textMuted,marginTop:2}}>{u.age}y · {u.fitnessLevel}</p>
          {u.gym!==sGym&&uGym&&<p style={{fontSize:11,color:T.accent,marginTop:2}}><MapPin size={10}/> {uGym.name}</p>}
          <p style={{fontSize:12,color:T.textDim,marginTop:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:220}}>{u.bio}</p>
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
        {u.matchReason&&<Badge color={T.primaryLight}>{u.matchReason}</Badge>}
        {rc&&<Badge color={rc.color}>Reliability {u.reliability.score}%</Badge>}
      </div>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        {isAccepted?<Btn onClick={()=>setChat(u)} variant="primary" size="sm" style={{flex:1}}><MessageCircle size={14}/> Message</Btn>:
        isSent?<Btn variant="secondary" size="sm" style={{flex:1}} disabled><Check size={14}/> Request Sent</Btn>:
        <Btn onClick={e=>{e.stopPropagation();handleConnect(u)}} variant="primary" size="sm" style={{flex:1}}><Zap size={14}/> Send GymLink Request</Btn>}
        {!isAccepted&&!isSent&&<Btn onClick={e=>{e.stopPropagation();handlePass(u)}} variant="ghost" size="sm"><X size={14}/> Pass</Btn>}
        <Btn onClick={e=>{e.stopPropagation();setPreview(u)}} variant="secondary" size="sm"><Eye size={14}/></Btn>
      </div>
    </Card>})}
    {hasMore&&<Btn onClick={()=>setPage(pg=>pg+1)} variant="secondary" style={{width:"100%",marginTop:8}}>Load More Partners</Btn>}
    <p style={{fontSize:12,color:T.textDim,textAlign:"center",marginTop:8}}>Showing {Math.min(allMatches.length,(page+1)*3)} of {allMatches.length} matches{expandTime?" (±2hr)":""}</p></div>}
  </div>;}

  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {ltToast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>Long-term partner confirmed with {ltToast}. Chat opening...</div>}
    <div style={{marginBottom:24}}><h1 style={{fontSize:26,fontWeight:800}}>Discover</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Find a gym partner for your next session</p></div>
    <div style={{display:"flex",gap:12,marginBottom:24}}>
      <Card onClick={()=>setMode("today")} style={{flex:1,padding:18,textAlign:"center",borderColor:mode==="today"?T.primary:T.border,background:mode==="today"?T.primary+"08":T.bgCard}}><Zap size={24} color={mode==="today"?T.primary:T.textDim} style={{margin:"0 auto 8px"}}/><p style={{fontWeight:700,fontSize:13,color:mode==="today"?T.text:T.textMuted}}>Today</p></Card>
      <Card onClick={()=>setMode("future")} style={{flex:1,padding:18,textAlign:"center",borderColor:mode==="future"?T.primary:T.border,background:mode==="future"?T.primary+"08":T.bgCard}}><Calendar size={24} color={mode==="future"?T.primary:T.textDim} style={{margin:"0 auto 8px"}}/><p style={{fontWeight:700,fontSize:13,color:mode==="future"?T.text:T.textMuted}}>Future Date</p></Card>
      <Card onClick={()=>setMode("longterm")} style={{flex:1,padding:18,textAlign:"center",borderColor:mode==="longterm"?T.accent:T.border,background:mode==="longterm"?T.accent+"08":T.bgCard}}><Users size={24} color={mode==="longterm"?T.accent:T.textDim} style={{margin:"0 auto 8px"}}/><p style={{fontWeight:700,fontSize:13,color:mode==="longterm"?T.text:T.textMuted}}>Long-term</p></Card>
    </div>
    {mode&&<div className="fade-in" style={{display:"flex",flexDirection:"column",gap:20}}>
      {mode==="future"&&<div>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:8}}>Select Date</label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4}}>
          {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,fontWeight:600,color:T.textDim,padding:4}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {(()=>{const days=[];const now=new Date();for(let i=1;i<=14;i++){const d=new Date(now);d.setDate(now.getDate()+i);const ds=d.toISOString().slice(0,10);const dayNum=d.getDate();const dow=d.getDay();if(i===1){for(let pad=0;pad<(dow===0?6:dow-1);pad++)days.push(null)}days.push({ds,dayNum})}return days})().map((d,i)=>d?<button key={i} onClick={()=>setFutureDate(d.ds)} style={{padding:"10px 4px",borderRadius:T.radiusSm,fontSize:13,fontWeight:futureDate===d.ds?700:500,background:futureDate===d.ds?T.primary:T.bgInput,color:futureDate===d.ds?"#fff":T.text,border:`1.5px solid ${futureDate===d.ds?T.primary:T.border}`,cursor:"pointer",transition:"all .2s"}}>{d.dayNum}</button>:<div key={i}/>)}
        </div>
        {futureDate&&<p style={{fontSize:12,color:T.primaryLight,marginTop:8,textAlign:"center"}}>Selected: {new Date(futureDate).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"short"})}</p>}
      </div>}

      {/* Home gym default — no postcode search on Discover */}
      {homeGymData?<div>
        <label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:6}}>Your Gym</label>
        <Card style={{padding:14,borderColor:sGym===homeGymData.id?T.primary:T.border,background:sGym===homeGymData.id?T.primary+"08":T.bgCard,display:"flex",alignItems:"center",gap:10,marginBottom:8}} onClick={()=>setSGym(homeGymData.id)}>
          <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sGym===homeGymData.id?T.primary:T.border}`,background:sGym===homeGymData.id?T.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sGym===homeGymData.id&&<Check size={10} color="#fff"/>}</div>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:13}}>{homeGymData.name}</p><p style={{fontSize:11,color:T.textDim}}>{homeGymData.address}</p></div>
          <Badge color={T.accent}>Home</Badge>
        </Card>
      </div>:
      <p style={{fontSize:13,color:T.textDim}}>No home gym set. Please update your gym in Profile settings.</p>}

      <Sel label="Select time" value={sTime} onChange={e=>setSTime(e.target.value)}><option value="">Choose time...</option>{TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}</Sel>
      <Sel label="Duration" value={sDur} onChange={e=>setSDur(e.target.value)}><option value="">Choose duration...</option>{DURATIONS.map(d=><option key={d} value={d}>{d} min</option>)}</Sel>
      <Btn onClick={()=>{setShowR(true);setPage(0);setPassed([])}} size="lg" style={{width:"100%"}} disabled={!canP()}><Search size={18}/> Find Partners</Btn>
    </div>}

    {/* LONG-TERM PARTNER */}
    {mode==="longterm"&&<div className="fade-in" style={{display:"flex",flexDirection:"column",gap:16}}>
      <Card style={{padding:16}}>
        <p style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:12}}>Filter Partners</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}}>
          <Sel value={ltFilters.fitnessLevel} onChange={e=>setLtFilters(f=>({...f,fitnessLevel:e.target.value}))}><option value="">Any Level</option>{FITNESS_LEVELS.map(l=><option key={l} value={l}>{l}</option>)}</Sel>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <Sel value={ltFilters.gender} onChange={e=>setLtFilters(f=>({...f,gender:e.target.value}))}><option value="">Any Gender</option>{GENDERS.slice(0,3).map(g=><option key={g} value={g}>{g}</option>)}</Sel>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <Input placeholder="Min age" inputMode="numeric" value={ltFilters.ageMin} onChange={e=>setLtFilters(f=>({...f,ageMin:e.target.value.replace(/[^0-9]/g,"")}))} containerStyle={{flex:1}}/>
          <Input placeholder="Max age" inputMode="numeric" value={ltFilters.ageMax} onChange={e=>setLtFilters(f=>({...f,ageMax:e.target.value.replace(/[^0-9]/g,"")}))} containerStyle={{flex:1}}/>
        </div>
        <p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:10}}>Your Weekly Availability</p>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {LT_DAYS.map(d=>{const isSelected=ltFilters.schedule.hasOwnProperty(d);const isExpanded=expandedDay===d;const dayTimes=ltFilters.schedule[d]||[];return <div key={d}>
            <div onClick={()=>toggleLtDay(d)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:isSelected?T.primary+"12":T.bgInput,border:`1.5px solid ${isSelected?T.primary:T.border}`,borderRadius:T.radiusSm,cursor:"pointer",transition:"all .2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${isSelected?T.primary:T.border}`,background:isSelected?T.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>{isSelected&&<Check size={12} color="#fff"/>}</div>
                <span style={{fontSize:14,fontWeight:600,color:isSelected?T.text:T.textMuted}}>{d}</span>
              </div>
              {isSelected&&<span style={{fontSize:11,color:T.primaryLight}}>{dayTimes.length?dayTimes.map(t=>LT_TIME_LABELS[t]||t).join(", "):"Any time"}</span>}
            </div>
            {isSelected&&isExpanded&&<div style={{padding:"10px 14px 10px 44px",display:"flex",flexWrap:"wrap",gap:6}}>
              {LT_TIME_RANGES.map(t=><button key={t.v} onClick={e=>{e.stopPropagation();toggleLtDayTime(d,t.v)}} style={{padding:"6px 12px",borderRadius:999,fontSize:11,fontWeight:600,cursor:"pointer",background:dayTimes.includes(t.v)?T.accent+"22":T.bgInput,color:dayTimes.includes(t.v)?T.accent:T.textDim,border:`1px solid ${dayTimes.includes(t.v)?T.accent:T.border}`,transition:"all .2s",fontFamily:T.font}}>{t.l}</button>)}
            </div>}
          </div>})}
        </div>
        <Btn onClick={()=>setLtSearched(true)} size="lg" style={{width:"100%",marginTop:16}}><Search size={18}/> Search Long-Term Partners</Btn>
      </Card>
      {ltSearched&&(ltPartnersWithStrength.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p style={{fontSize:15,marginBottom:8}}>No partners found yet.</p><p style={{fontSize:13}}>Try widening your age range, gym area, or time availability.</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{ltPartnersWithStrength.map(u=>{const strengthColors={Strong:T.success,Good:T.accent,Possible:T.warning};const isSent=ltSentRequests.some(r=>r.id===u.id);const isConfirmed=ltConfirmedMatches.some(r=>r.id===u.id);return <Card key={u.id} style={{padding:18,position:"relative"}}>
        {isSent&&!isConfirmed&&<div style={{position:"absolute",top:12,right:12}}><Badge color={T.warning}>Request Sent</Badge></div>}
        {isConfirmed&&<div style={{position:"absolute",top:12,right:12}}><Badge color={T.success} glow>Accepted</Badge></div>}
        <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
          <Avatar name={u.name} size={50} verified={true}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><p style={{fontWeight:600,fontSize:15}}>{u.name}</p><Badge color={strengthColors[u.matchStrength]||T.primary} glow>{u.matchStrength} Match</Badge></div>
            <p style={{fontSize:13,color:T.textMuted,marginTop:2}}>{u.age}y · {u.gender} · {u.fitnessLevel}</p>
            {u.reliability&&<div style={{marginTop:4}}><Badge color={getRelCat(u.reliability.score).color}>Reliability {u.reliability.score}%</Badge></div>}
            <p style={{fontSize:12,color:T.textDim,marginTop:6}}>{u.bio}</p>
            {u.overlapDesc&&<p style={{fontSize:12,color:T.accent,marginTop:6,fontWeight:600}}>{u.overlapDesc}</p>}
            {u.availability&&<div style={{marginTop:8}}><div style={{display:"flex",flexDirection:"column",gap:3}}>{Object.entries(u.availability).map(([day,times])=><div key={day} style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{fontSize:11,fontWeight:700,color:T.primaryLight,minWidth:30}}>{day}</span>{times.map(t=><span key={t} style={{fontSize:10,padding:"2px 8px",background:T.accent+"15",borderRadius:4,color:T.accent}}>{LT_TIME_LABELS[t]||t}</span>)}</div>)}</div></div>}
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          {isConfirmed?<Btn onClick={()=>setLtChat(u)} variant="primary" size="sm" style={{flex:1}}><MessageCircle size={14}/> Message</Btn>:
          isSent?<Btn variant="secondary" size="sm" style={{flex:1}} disabled><Check size={14}/> Request Sent</Btn>:
          <Btn onClick={()=>handleLtRequest(u)} variant="primary" size="sm" style={{flex:1}}><Users size={14}/> Send Long-Term Partner Request</Btn>}
          <Btn onClick={()=>setPreview(u)} variant="secondary" size="sm"><Eye size={14}/></Btn>
        </div>
      </Card>})}</div>)}
    </div>}
  </div>;
};

// ═══ MATCHES SCREEN ═══
const MatchesScreen=({confirmedMatches,ltConfirmedMatches=[],initialChat,onChatOpened})=>{
  const[chat,setChat]=useState(null);
  const[preview,setPreview]=useState(null);
  const TIME_LABELS_M={early:"Early 5–8am",morning:"Morning 8am–12pm",midday:"Midday 12–3pm",afternoon:"Afternoon 3–6pm",evening:"Evening 6–10pm",late:"Late 10pm+"};
  useEffect(()=>{if(initialChat){setChat(initialChat);onChatOpened&&onChatOpened()}},[initialChat]);
  if(chat)return <ChatModal user={chat} onClose={()=>setChat(null)}/>;
  const allConnections=[...confirmedMatches,...ltConfirmedMatches];
  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>{preview&&<ProfilePreview user={preview} onConnect={()=>setPreview(null)} onPass={()=>setPreview(null)} onClose={()=>setPreview(null)} connected={true}/>}<div style={{marginBottom:24}}><h1 style={{fontSize:26,fontWeight:800}}>Matches & Connections</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Confirmed partners — chat is unlocked</p></div>
    {allConnections.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Heart size={40} style={{marginBottom:12}}/><p style={{fontSize:15}}>No confirmed matches yet</p><p style={{fontSize:13,marginTop:4}}>Connect with partners, then wait for them to accept</p></div>:
    <div style={{display:"flex",flexDirection:"column",gap:12}}>{allConnections.map((u,i)=>{const gy=u.gymId?GYMS_DB.find(g=>g.id===u.gymId):null;const isLt=u.sessionType==="longTerm";return <Card key={u.sessionKey||u.id+"-"+i} className="fade-in-up" style={{animationDelay:`${i*.08}s`,padding:18}}>
      <div onClick={()=>setPreview(u)} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10,cursor:"pointer"}}><Avatar name={u.name} size={50} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{u.name}</p><p style={{fontSize:13,color:T.textMuted}}>{u.age}y · {u.fitnessLevel}</p></div><Badge color={T.success} glow>Accepted</Badge></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        <Badge color={isLt?T.accent:u.sessionType==="today"?T.primary:T.warning}>{isLt?"Long-term Partner":u.sessionType==="today"?"GymLink Today":"Future Date"}</Badge>
        {!isLt&&u.date&&<Badge color={T.textDim}><Calendar size={10}/> {u.sessionType==="today"?"Today":u.date}</Badge>}
        {!isLt&&u.time&&<Badge color={T.textDim}><Clock size={10}/> {u.time}</Badge>}
        {gy&&<Badge color={T.textDim}><MapPin size={10}/> {gy.name}</Badge>}
      </div>
      {isLt&&u.availability&&<div style={{marginBottom:10}}><div style={{display:"flex",flexDirection:"column",gap:3}}>{Object.entries(u.availability).map(([day,times])=><div key={day} style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{fontSize:11,fontWeight:700,color:T.primaryLight,minWidth:30}}>{day}</span>{times.map(t=><span key={t} style={{fontSize:10,padding:"2px 8px",background:T.accent+"15",borderRadius:4,color:T.accent}}>{TIME_LABELS_M[t]||t}</span>)}</div>)}</div></div>}
      <div style={{display:"flex",gap:10}}><Btn onClick={()=>setChat(u)} variant="primary" size="sm" style={{flex:1}}><MessageCircle size={14}/> Message</Btn>{!isLt&&<Btn variant="secondary" size="sm" style={{flex:1}}><Calendar size={14}/> Schedule</Btn>}</div>
    </Card>})}</div>}
  </div>;
};

// ═══ REQUESTS SCREEN (role-aware) ═══
const MOCK_TRAINER_REQUESTS=[
  {id:"tr1",type:"enquiry",userName:"Casey Kim",userAge:27,userGender:"Female",goal:"Lose 10kg",gym:"g1",prefDate:"2026-05-08",prefTime:"18:00",message:"Hi, I'm looking for 1-to-1 sessions focused on weight loss with HIIT. Available evenings."},
  {id:"tr2",type:"bootcamp",userName:"Morgan Lee",userAge:22,bootcampName:"Dawn HIIT Blast",date:"2026-05-05",time:"06:00",price:15},
  {id:"tr3",type:"group",userName:"Sam Taylor",userAge:31,groupName:"Open Gym: Strength Coaching",gym:"g2",date:"2026-05-06",time:"10:00"},
  {id:"tr4",type:"enquiry",userName:"Riley Park",userAge:26,userGender:"Female",goal:"Build strength",gym:"g1",prefDate:"2026-05-10",prefTime:"17:00",message:"Interested in personal training for upper body strength. Beginner level."},
];

const RequestsScreen=({incomingRequests,onAccept,onDecline,sentRequests,role,trainerReqs:tReqs,setTrainerReqs:setTReqs,acceptedBookings,setAcceptedBookings,trainerBootcamps,setTrainerBootcamps,trainerGroups,setTrainerGroups})=>{
  const[tab,setTab]=useState("incoming");
  const[preview,setPreview]=useState(null);

  // ── TRAINER REQUESTS VIEW ──
  if(role==="trainer"&&tReqs){
    const handleApprove=(id)=>{
      const req=tReqs.find(x=>x.id===id);
      if(!req)return;
      // Add to acceptedBookings
      setAcceptedBookings(b=>[...b,{...req,status:"accepted",acceptedAt:new Date().toISOString()}]);
      // Add attendee to the correct bootcamp/group session
      if(req.type==="bootcamp"&&req.bootcampName&&setTrainerBootcamps){
        const uId=req.id; // use request id as proxy userId
        setTrainerBootcamps(bs=>bs.map(b=>{
          if(b.title===req.bootcampName&&!(b.attendees||[]).includes(uId)){
            const att=[...(b.attendees||[]),uId];
            return{...b,attendees:att,spotsLeft:Math.max(0,b.capacity-att.length)};
          }return b;
        }));
      }
      if(req.type==="group"&&req.groupName&&setTrainerGroups){
        const uId=req.id;
        setTrainerGroups(gs=>gs.map(g=>{
          if(g.title===req.groupName&&!(g.attendees||[]).includes(uId)){
            const att=[...(g.attendees||[]),uId];
            return{...g,attendees:att,spotsLeft:Math.max(0,g.capacity-att.length)};
          }return g;
        }));
      }
      setTReqs(r=>r.filter(x=>x.id!==id));
    };
    const handleDeclineT=(id)=>setTReqs(r=>r.filter(x=>x.id!==id));
    const enquiries=tReqs.filter(r=>r.type==="enquiry");
    const bootcampReqs=tReqs.filter(r=>r.type==="bootcamp");
    const groupReqs=tReqs.filter(r=>r.type==="group");
    const tTabs=[{k:"enquiries",l:`Enquiries (${enquiries.length})`},{k:"bootcamp",l:`Bootcamps (${bootcampReqs.length})`},{k:"group",l:`Group (${groupReqs.length})`}];

    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <div style={{marginBottom:20}}><h1 style={{fontSize:26,fontWeight:800}}>Requests</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Client enquiries and session requests</p></div>
      <div style={{display:"flex",gap:8,marginBottom:24,overflowX:"auto"}}>{tTabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"8px 16px",borderRadius:999,fontSize:13,fontWeight:600,whiteSpace:"nowrap",background:tab===t.k?T.primary+"22":T.bgInput,color:tab===t.k?T.primaryLight:T.textMuted,border:`1.5px solid ${tab===t.k?T.primary:T.border}`,cursor:"pointer",fontFamily:T.font}}>{t.l}</button>)}</div>

      {tab==="enquiries"&&(enquiries.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Send size={40} style={{marginBottom:12}}/><p>No pending enquiries</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{enquiries.map(r=>{const gy=GYMS_DB.find(g=>g.id===r.gym);return <Card key={r.id} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={r.userName} size={44} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{r.userName}</p><p style={{fontSize:12,color:T.textDim}}>{r.userAge}y · {r.userGender}</p></div><Badge color={T.primaryLight}>PT Enquiry</Badge></div>
        <div style={{marginBottom:12}}><p style={{fontSize:13,color:T.textMuted,marginBottom:4}}><strong style={{color:T.text}}>Goal:</strong> {r.goal}</p>{gy&&<p style={{fontSize:12,color:T.textDim}}><MapPin size={11}/> {gy.name}</p>}<p style={{fontSize:12,color:T.textDim}}><Calendar size={11}/> {r.prefDate} · <Clock size={11}/> {r.prefTime}</p></div>
        <div style={{background:T.bgInput,borderRadius:T.radiusSm,padding:12,marginBottom:14}}><p style={{fontSize:13,color:T.textMuted,lineHeight:1.5,fontStyle:"italic"}}>"{r.message}"</p></div>
        <div style={{display:"flex",gap:8}}><Btn onClick={()=>handleDeclineT(r.id)} variant="outlineDanger" size="sm" style={{flex:1}}><X size={14}/> Decline</Btn><Btn onClick={()=>handleApprove(r.id)} variant="success" size="sm" style={{flex:1}}><Check size={14}/> Accept</Btn><Btn variant="secondary" size="sm"><MessageCircle size={14}/></Btn></div>
      </Card>})}</div>)}

      {tab==="bootcamp"&&(bootcampReqs.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p>No bootcamp join requests</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{bootcampReqs.map(r=><Card key={r.id} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={r.userName} size={44} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{r.userName}</p><p style={{fontSize:12,color:T.textDim}}>{r.userAge}y</p></div><Badge color={T.accent}>Bootcamp Join</Badge></div>
        <div style={{marginBottom:12}}><p style={{fontSize:13,color:T.text,fontWeight:600}}>{r.bootcampName}</p><p style={{fontSize:12,color:T.textDim}}><Calendar size={11}/> {r.date} · <Clock size={11}/> {r.time} · {r.price>0?`£${r.price}`:"Free"}</p></div>
        <div style={{display:"flex",gap:8}}><Btn onClick={()=>handleDeclineT(r.id)} variant="outlineDanger" size="sm" style={{flex:1}}><X size={14}/> Decline</Btn><Btn onClick={()=>handleApprove(r.id)} variant="success" size="sm" style={{flex:1}}><Check size={14}/> Approve</Btn><Btn variant="secondary" size="sm"><MessageCircle size={14}/></Btn></div>
      </Card>)}</div>)}

      {tab==="group"&&(groupReqs.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p>No group training requests</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{groupReqs.map(r=>{const gy=GYMS_DB.find(g=>g.id===r.gym);return <Card key={r.id} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={r.userName} size={44} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{r.userName}</p><p style={{fontSize:12,color:T.textDim}}>{r.userAge}y</p></div><Badge color={T.warning}>Group Join</Badge></div>
        <div style={{marginBottom:12}}><p style={{fontSize:13,color:T.text,fontWeight:600}}>{r.groupName}</p>{gy&&<p style={{fontSize:12,color:T.textDim}}><MapPin size={11}/> {gy.name}</p>}<p style={{fontSize:12,color:T.textDim}}><Calendar size={11}/> {r.date} · <Clock size={11}/> {r.time}</p></div>
        <div style={{display:"flex",gap:8}}><Btn onClick={()=>handleDeclineT(r.id)} variant="outlineDanger" size="sm" style={{flex:1}}><X size={14}/> Decline</Btn><Btn onClick={()=>handleApprove(r.id)} variant="success" size="sm" style={{flex:1}}><Check size={14}/> Approve</Btn><Btn variant="secondary" size="sm"><MessageCircle size={14}/></Btn></div>
      </Card>})}</div>)}
    </div>;
  }

  // ── GYM MEMBER REQUESTS VIEW (existing logic) ──
  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>{preview&&<ProfilePreview user={preview} onConnect={()=>setPreview(null)} onPass={()=>setPreview(null)} onClose={()=>setPreview(null)} connected={true}/>}<div style={{marginBottom:20}}><h1 style={{fontSize:26,fontWeight:800}}>Requests</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Gym buddy match requests</p></div>
    <div style={{display:"flex",gap:8,marginBottom:24}}>{[{k:"incoming",l:`Incoming (${incomingRequests.length})`},{k:"sent",l:`Sent (${sentRequests.length})`}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"8px 16px",borderRadius:999,fontSize:13,fontWeight:600,background:tab===t.k?T.primary+"22":T.bgInput,color:tab===t.k?T.primaryLight:T.textMuted,border:`1.5px solid ${tab===t.k?T.primary:T.border}`,cursor:"pointer",fontFamily:T.font}}>{t.l}</button>)}</div>
    {tab==="incoming"&&(incomingRequests.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><MessageCircle size={40} style={{marginBottom:12}}/><p>No incoming requests</p></div>:
    <div style={{display:"flex",flexDirection:"column",gap:12}}>{incomingRequests.map(u=>{const gy=u.gymId?GYMS_DB.find(g=>g.id===u.gymId):null;return <Card key={u.sessionKey||u.id} style={{padding:18}}>
      <div onClick={()=>setPreview(u)} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10,cursor:"pointer"}}><Avatar name={u.name} size={50} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{u.name}</p><p style={{fontSize:13,color:T.textMuted}}>{u.age}y · {u.fitnessLevel}</p><p style={{fontSize:12,color:T.textDim,marginTop:4}}>{u.bio}</p></div>{u.reliability&&<Badge color={getRelCat(u.reliability.score).color}>{u.reliability.score}%</Badge>}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {u.sessionType&&<Badge color={u.sessionType==="today"?T.primary:T.warning}>{u.sessionType==="today"?"GymLink Today":"GymLink Future"}</Badge>}
        {u.date&&<Badge color={T.textDim}><Calendar size={10}/> {u.sessionType==="today"?"Today":u.date}</Badge>}
        {u.time&&<Badge color={T.textDim}><Clock size={10}/> {u.time}</Badge>}
        {gy&&<Badge color={T.textDim}><MapPin size={10}/> {gy.name}</Badge>}
      </div>
      <div style={{display:"flex",gap:10}}><Btn onClick={()=>onDecline(u.sessionKey||u.id)} variant="outlineDanger" size="sm" style={{flex:1}}><X size={14}/> Decline</Btn><Btn onClick={()=>onAccept(u.sessionKey||u.id)} variant="success" size="sm" style={{flex:1}}><Check size={14}/> Accept</Btn></div>
    </Card>})}</div>)}
    {tab==="sent"&&(sentRequests.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Send size={40} style={{marginBottom:12}}/><p>No sent requests</p></div>:
    <div style={{display:"flex",flexDirection:"column",gap:12}}>{sentRequests.map((u,i)=>{const gy=u.gymId?GYMS_DB.find(g=>g.id===u.gymId):null;return <Card key={u.sessionKey||u.id+i} style={{padding:18}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}><Avatar name={u.name} size={44} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{u.name}</p><p style={{fontSize:12,color:T.textDim}}>{u.fitnessLevel}</p></div><Badge color={T.warning}>Pending</Badge></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {u.sessionType&&<Badge color={u.sessionType==="today"?T.primary:T.warning}>{u.sessionType==="today"?"Today":"Future"}</Badge>}
        {u.date&&u.sessionType!=="today"&&<Badge color={T.textDim}>{u.date}</Badge>}
        {u.time&&<Badge color={T.textDim}>{u.time}</Badge>}
        {gy&&<Badge color={T.textDim}>{gy.name}</Badge>}
      </div>
    </Card>})}</div>)}
  </div>;
};

// ═══ TRAINERS/BROWSE SCREEN ═══
const TrainersScreen=({userProfile})=>{
  const[tab,setTab]=useState("trainers");
  const[trainerProfile,setTrainerProfile]=useState(null);
  const[joinItem,setJoinItem]=useState(null);
  const[joinType,setJoinType]=useState(null);
  const[preview,setPreview]=useState(null);
  const myGymIds=userProfile.gyms||[];
  const nearbyTrainers=MOCK_TRAINERS.filter(t=>t.gyms.some(g=>myGymIds.includes(g)));
  const tabs=[{key:"trainers",label:"Trainers"},{key:"bootcamps",label:"Bootcamps"},{key:"group",label:"Group"},{key:"mic",label:"Make It Count"}];

  const[enquirySent,setEnquirySent]=useState(null);
  const handleTrainerEnquiry=(type)=>{setEnquirySent(trainerProfile?.name||"Trainer");setTimeout(()=>setEnquirySent(null),3000);setTrainerProfile(null)};
  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {enquirySent&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>Enquiry sent to {enquirySent}.</div>}
    {trainerProfile&&<TrainerProfile trainer={trainerProfile} onClose={()=>setTrainerProfile(null)} onEnquiry={handleTrainerEnquiry}/>}
    {joinItem&&<JoinModal item={joinItem} type={joinType} onClose={()=>{setJoinItem(null);setJoinType(null)}} onJoin={()=>{setJoinItem(null);setJoinType(null)}}/>}
    <div style={{marginBottom:20}}><h1 style={{fontSize:26,fontWeight:800}}>Train & Connect</h1></div>
    <div style={{display:"flex",gap:8,marginBottom:24,overflowX:"auto",paddingBottom:4}}>{tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"8px 16px",borderRadius:999,fontSize:13,fontWeight:600,whiteSpace:"nowrap",background:tab===t.key?T.primary+"22":T.bgInput,color:tab===t.key?T.primaryLight:T.textMuted,border:`1.5px solid ${tab===t.key?T.primary:T.border}`,cursor:"pointer",fontFamily:T.font}}>{t.label}</button>)}</div>

    {/* TRAINERS */}
    {tab==="trainers"&&(nearbyTrainers.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Award size={40} style={{marginBottom:12}}/><p>No trainers at your gym yet</p></div>:
    <div style={{display:"flex",flexDirection:"column",gap:14}}>{nearbyTrainers.map(t=><Card key={t.id} onClick={()=>setTrainerProfile(t)} className="fade-in-up" style={{padding:20}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={t.name} size={52} verified={true} badge={`£${t.rate}/hr`}/><div style={{flex:1}}><p style={{fontWeight:700,fontSize:16}}>{t.name}</p><div style={{display:"flex",gap:8,marginTop:4}}><span style={{fontSize:13,color:T.warning}}>★ {t.rating}</span><span style={{fontSize:12,color:T.textDim}}>{t.clients} clients</span>{t.hasVideo&&<Badge color={T.primary}><Play size={10}/> Video</Badge>}</div></div><ChevronRight size={18} color={T.textDim}/></div>
      <p style={{fontSize:13,color:T.textMuted,marginBottom:10,lineHeight:1.5}}>{t.bio}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{t.specialties.map(s=><Badge key={s} color={T.accent}>{s}</Badge>)}</div>
    </Card>)}</div>)}

    {/* LONG-TERM */}
    {/* BOOTCAMPS */}
    {tab==="bootcamps"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
      {MOCK_BOOTCAMPS.map(b=>{const tr=MOCK_TRAINERS.find(t=>t.id===b.trainerId);const gy=GYMS_DB.find(g=>g.id===b.gym);return <Card key={b.id} onClick={()=>{setJoinItem(b);setJoinType("bootcamp")}} className="fade-in-up" style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{b.title}</h3><Badge color={b.spotsLeft<=3?T.danger:T.success}>{b.spotsLeft} spots</Badge></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}><Badge color={T.primary}><Calendar size={11}/> {b.date}</Badge><Badge color={T.accent}><Clock size={11}/> {b.time}</Badge><Badge color={T.accent}>{b.duration} min</Badge><Badge color={T.warning}>£{b.price}</Badge><Badge color={T.primaryLight}>{b.type}</Badge></div>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:8}}><MapPin size={11}/> {gy.name}</p>}
        {tr&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Avatar name={tr.name} size={28} verified={true}/><span style={{fontSize:13,color:T.textMuted}}>{tr.name}</span>{tr.hasVideo&&<Badge color={T.primary}><Play size={9}/></Badge>}</div>}
        <p style={{fontSize:12,color:T.textDim}}>{b.capacity-b.spotsLeft}/{b.capacity} joined · {b.attendees.length} attendees visible</p>
      </Card>})}
    </div>}

    {/* GROUP */}
    {tab==="group"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
      <p style={{fontSize:13,color:T.textMuted,marginBottom:8}}>Trainers posting extra spots in their sessions</p>
      {MOCK_GROUP.map(g=>{const tr=MOCK_TRAINERS.find(t=>t.id===g.trainerId);const gy=GYMS_DB.find(x=>x.id===g.gym);return <Card key={g.id} onClick={()=>{setJoinItem(g);setJoinType("group")}} className="fade-in-up" style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{g.title}</h3><Badge color={g.isFree?T.success:T.warning}>{g.isFree?"Free":`£${g.price}`}</Badge></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}><Badge color={T.primary}><Calendar size={11}/> {g.date}</Badge><Badge color={T.accent}><Clock size={11}/> {g.time}</Badge><Badge color={T.accent}>{g.duration} min</Badge><Badge color={g.spotsLeft<=1?T.danger:T.success}>{g.spotsLeft} spots left</Badge><Badge color={T.primaryLight}>{g.type}</Badge></div>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:8}}><MapPin size={11}/> {gy.name}</p>}
        {tr&&<div style={{display:"flex",alignItems:"center",gap:10}}><Avatar name={tr.name} size={28} verified={true}/><span style={{fontSize:13,color:T.textMuted}}>{tr.name} · ★ {tr.rating}</span>{tr.hasVideo&&<Badge color={T.primary}><Play size={9}/></Badge>}{tr.photos>0&&<Badge color={T.textDim}><Image size={9}/> {tr.photos}</Badge>}</div>}
      </Card>})}
    </div>}

    {/* MAKE IT COUNT */}
    {tab==="mic"&&<MakeItCountScreen userProfile={userProfile} onBack={()=>setTab("trainers")}/>}
  </div>;
};

// ═══ TRAINER DASHBOARD ═══
const TrainerDashboard=({userProfile,trainerReqs=[],acceptedBookings=[],setAcceptedBookings,trainerBootcamps=[],setTrainerBootcamps,trainerGroups=[],setTrainerGroups})=>{
  const[chat,setChat]=useState(null);
  const[dashTab,setDashTab]=useState("overview");
  const[viewAttendees,setViewAttendees]=useState(null);
  const[viewProfile,setViewProfile]=useState(null);
  const[msgAllText,setMsgAllText]=useState("");
  const[msgAllTarget,setMsgAllTarget]=useState(null);
  const[toast,setToast]=useState(null);
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),2500)};
  const tid=userProfile.trainerId||"t1";
  const ptClients=acceptedBookings.filter(b=>b.type==="enquiry");
  // Date helper: check if a session date is in the future
  const isFuture=(dateStr)=>{try{const d=new Date(dateStr);return d>=new Date(new Date().toISOString().slice(0,10))}catch(e){console.warn("Could not parse session date:",dateStr);return true}};
  const ptUpcoming=ptClients.filter(c=>c.status!=="completed"&&c.status!=="cancelled"&&isFuture(c.prefDate));
  const bcConfirmed=trainerBootcamps.filter(b=>b.status==="confirmed");
  const bcUpcoming=bcConfirmed.filter(b=>isFuture(b.date));
  const grConfirmed=trainerGroups.filter(g=>g.status==="confirmed");
  const grUpcoming=grConfirmed.filter(g=>isFuture(g.date));
  const bcBookings=acceptedBookings.filter(b=>b.type==="bootcamp");
  const grBookings=acceptedBookings.filter(b=>b.type==="group");
  const totalAttendees=trainerBootcamps.reduce((s,b)=>(b.attendees?s+b.attendees.length:s),0)+trainerGroups.reduce((s,g)=>s+(g.capacity-g.spotsLeft),0);
  const ptRevenue=ptClients.filter(c=>c.status!=="cancelled").reduce((s,c)=>s+(+c.price||+userProfile.rate||0),0);
  const bcRevenue=bcConfirmed.filter(b=>b.price>0).reduce((s,b)=>s+(b.price*(b.attendees?.length||0)),0);
  const grRevenue=grConfirmed.filter(g=>g.price>0&&!g.isFree).reduce((s,g)=>s+(g.price*(g.attendees?.length||(g.capacity-g.spotsLeft)||0)),0);
  const revenue=ptRevenue+bcRevenue+grRevenue;
  console.log("Revenue breakdown — PT:",ptRevenue,"BC:",bcRevenue,"GR:",grRevenue,"Total:",revenue);
  const pendingCount=(trainerReqs||[]).length;
  const markComplete=(id)=>setAcceptedBookings(b=>b.map(x=>x.id===id?{...x,status:"completed"}:x));
  const cancelBooking=(id)=>setAcceptedBookings(b=>b.filter(x=>x.id!==id));

  if(chat)return <ChatModal user={{name:chat.userName||chat.name||"Client",...chat}} onClose={()=>setChat(null)}/>;

  // Message all attendees modal
  if(msgAllTarget)return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    <button onClick={()=>{setMsgAllTarget(null);setMsgAllText("")}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
    <h2 style={{fontSize:22,fontWeight:800,marginBottom:8}}>Message All Attendees</h2>
    <p style={{color:T.textMuted,fontSize:14,marginBottom:20}}>{msgAllTarget.title} — {msgAllTarget.attendees?.length||0} attendees</p>
    <TextArea value={msgAllText} onChange={e=>setMsgAllText(e.target.value)} placeholder="e.g. Please arrive 10 minutes early. Bring water and a towel." style={{minHeight:100,marginBottom:16}}/>
    <Btn onClick={()=>{showToast(`Message sent to ${msgAllTarget.attendees?.length||0} attendees`);setMsgAllTarget(null);setMsgAllText("")}} size="lg" style={{width:"100%"}} disabled={!msgAllText.trim()}><Send size={16}/> Send to All</Btn>
  </div>;

  // View attendees sub-view
  if(viewAttendees){
    if(viewProfile){const u=viewProfile;return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setViewProfile(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back to Attendees</button>
      <div style={{textAlign:"center",marginBottom:24}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Avatar name={u.name} size={80} verified={true}/></div><h2 style={{fontSize:22,fontWeight:800}}>{u.name}</h2><p style={{fontSize:14,color:T.textMuted,marginTop:4}}>{u.age}y · {u.gender} · {u.fitnessLevel}</p><div style={{marginTop:8}}><Badge color={T.accent} glow>Verified ✓</Badge></div></div>
      <p style={{fontSize:14,color:T.textMuted,lineHeight:1.6,marginBottom:24}}>{u.bio||"No bio."}</p>
      <Btn onClick={()=>{setViewProfile(null);setViewAttendees(null);setChat(u)}} variant="primary" size="lg" style={{width:"100%"}}><MessageCircle size={16}/> Message {u.name}</Btn>
    </div>}
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setViewAttendees(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:8}}>Attendees</h2>
      <p style={{color:T.textMuted,fontSize:14,marginBottom:16}}>{viewAttendees.title} — {viewAttendees.attendees?.length||0} registered</p>
      <Btn onClick={()=>{setMsgAllTarget(viewAttendees);setViewAttendees(null)}} variant="secondary" size="sm" style={{marginBottom:16}}><Send size={14}/> Message All</Btn>
      {(viewAttendees.attendees||[]).length===0?<p style={{color:T.textDim}}>No attendees yet.</p>:
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{viewAttendees.attendees.map(uid=>{const u=MOCK_USERS.find(x=>x.id===uid);return u?<Card key={uid} onClick={()=>setViewProfile(u)} style={{display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer"}}>
        <Avatar name={u.name} size={44} verified={true}/>
        <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{u.name}</p><p style={{fontSize:12,color:T.textDim}}>{u.age}y · {u.gender}</p><p style={{fontSize:12,color:T.textDim,marginTop:2}}>{u.bio?.substring(0,80)}{u.bio?.length>80?"...":""}</p></div>
        <ChevronRight size={16} color={T.textDim}/>
      </Card>:null})}</div>}
    </div>;
  }

  const statKeys=["upcoming","clients","pending","revenue"];
  const stats=[{key:"upcoming",label:"Upcoming",value:ptUpcoming.length+bcUpcoming.length+grUpcoming.length,icon:Calendar,color:T.accent},{key:"clients",label:"Clients",value:ptClients.length,icon:Users,color:T.primary},{key:"pending",label:"Pending",value:pendingCount,icon:Bell,color:T.warning},{key:"revenue",label:"Revenue",value:`£${revenue}`,icon:TrendingUp,color:T.success}];
  const dTabs=[{key:"overview",label:"Overview"},{key:"pt",label:`1-to-1 (${ptUpcoming.length})`},{key:"bootcamps",label:`Bootcamps (${bcConfirmed.length})`},{key:"group",label:`Group (${grConfirmed.length})`}];

  // Week helpers for clients view
  const getWeekDays=()=>{const d=new Date();const dow=d.getDay();const mon=new Date(d);mon.setDate(d.getDate()-(dow===0?6:dow-1));return["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((_,i)=>{const day=new Date(mon);day.setDate(mon.getDate()+i);return day.toISOString().slice(0,10)})};
  const weekDays=getWeekDays();
  const dayNames=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  // All upcoming bookings sorted by date for dates view
  const allUpcoming=[...ptUpcoming.map(c=>({...c,bookType:"1-to-1",sessionName:c.userName,dateKey:c.prefDate,timeKey:c.prefTime})),...bcUpcoming.map(b=>({...b,bookType:"Bootcamp",sessionName:b.title,dateKey:b.date,timeKey:b.time})),...grUpcoming.map(g=>({...g,bookType:"Group",sessionName:g.title,dateKey:g.date,timeKey:g.time}))].sort((a,b)=>(a.dateKey||"").localeCompare(b.dateKey||""));

  // Revenue breakdown
  const revenueItems=[...ptClients.filter(c=>c.status!=="cancelled").map(c=>({name:`1-to-1: ${c.userName}`,date:c.prefDate,price:+c.price||+userProfile.rate||55,qty:1,total:+c.price||+userProfile.rate||55,type:"1-to-1"})),...bcConfirmed.filter(b=>b.price>0).map(b=>({name:`Bootcamp: ${b.title}`,date:b.date,price:b.price,qty:b.attendees?.length||0,total:b.price*(b.attendees?.length||0),type:"Bootcamp"})),...grConfirmed.filter(g=>g.price>0&&!g.isFree).map(g=>({name:`Group: ${g.title}`,date:g.date,price:g.price,qty:g.attendees?.length||(g.capacity-g.spotsLeft)||0,total:g.price*(g.attendees?.length||(g.capacity-g.spotsLeft)||0),type:"Group"}))];
  console.log("Revenue items:",revenueItems.length,"PT:",ptClients.length,"BC:",bcConfirmed.length,"GR:",grConfirmed.length);

  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>{toast}</div>}
    <div style={{marginBottom:20}}><h1 style={{fontSize:26,fontWeight:800}}>Dashboard</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Welcome, {userProfile.name}</p></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>{stats.map((s,i)=>{const I=s.icon;return <Card key={i} onClick={()=>setDashTab(s.key)} className="fade-in-up" style={{animationDelay:`${i*.06}s`,padding:16,textAlign:"center",cursor:"pointer",borderColor:dashTab===s.key?s.color:T.border}}><I size={20} color={s.color} style={{marginBottom:6}}/><p style={{fontSize:20,fontWeight:800}}>{s.value}</p><p style={{fontSize:11,color:T.textDim,marginTop:4}}>{s.label}</p></Card>})}</div>
    <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>{dTabs.map(t=><button key={t.key} onClick={()=>setDashTab(t.key)} style={{padding:"7px 14px",borderRadius:999,fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:dashTab===t.key?T.primary+"22":T.bgInput,color:dashTab===t.key?T.primaryLight:T.textMuted,border:`1.5px solid ${dashTab===t.key?T.primary:T.border}`,cursor:"pointer",fontFamily:T.font}}>{t.label}</button>)}</div>

    {/* REVENUE DETAIL */}
    {dashTab==="revenue"&&<div>
      <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Revenue Breakdown</h3>
      {revenueItems.length===0?<p style={{color:T.textDim}}>No paid sessions yet.</p>:
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {revenueItems.map((r,i)=><Card key={i} style={{padding:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{r.name}</p><p style={{fontSize:12,color:T.textDim}}>{r.date} · £{r.price} × {r.qty}</p></div>
          <p style={{fontWeight:700,fontSize:16,color:T.success}}>£{r.total}</p>
        </Card>)}
        <Card style={{padding:16,background:T.primary+"08",borderColor:T.primary}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><p style={{fontWeight:700,fontSize:15}}>Total Revenue</p><p style={{fontWeight:800,fontSize:20,color:T.success}}>£{revenueItems.reduce((s,r)=>s+r.total,0)}</p></div>
        </Card>
      </div>}
    </div>}

    {/* UPCOMING / DATES DETAIL */}
    {dashTab==="upcoming"&&<div>
      <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Upcoming Bookings</h3>
      {allUpcoming.length===0?<p style={{color:T.textDim}}>No upcoming sessions.</p>:
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{allUpcoming.map((b,i)=>{const gy=b.gym?GYMS_DB.find(g=>g.id===b.gym):null;return <Card key={b.id||i} onClick={()=>{if(b.bookType==="1-to-1")setDashTab("pt");else if(b.bookType==="Bootcamp")setDashTab("bootcamps");else setDashTab("group")}} style={{padding:16,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <div style={{minWidth:46,textAlign:"center"}}><p style={{fontSize:18,fontWeight:800,color:T.primaryLight}}>{b.dateKey?.slice(8)}</p><p style={{fontSize:10,color:T.textDim}}>{new Date(b.dateKey).toLocaleDateString("en-GB",{month:"short"})}</p></div>
        <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{b.sessionName}</p><div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}><Badge color={b.bookType==="1-to-1"?T.primary:b.bookType==="Bootcamp"?T.accent:T.warning}>{b.bookType}</Badge>{b.timeKey&&<Badge color={T.textDim}><Clock size={10}/> {b.timeKey}</Badge>}{gy&&<Badge color={T.textDim}><MapPin size={10}/> {gy.name}</Badge>}</div></div>
        <ChevronRight size={16} color={T.textDim}/>
      </Card>})}</div>}
    </div>}

    {/* PENDING DETAIL */}
    {dashTab==="pending"&&<div>
      <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Pending & Open</h3>
      {pendingCount===0&&trainerBootcamps.filter(b=>b.status==="open").length===0&&trainerGroups.filter(g=>g.status==="open").length===0?<p style={{color:T.textDim}}>Nothing pending.</p>:<div style={{display:"flex",flexDirection:"column",gap:12}}>
        {(trainerReqs||[]).map(r=><Card key={r.id} style={{padding:16,display:"flex",alignItems:"center",gap:12}}>
          <Avatar name={r.userName||"User"} size={40} verified={true}/>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{r.userName}</p><p style={{fontSize:12,color:T.textDim}}>{r.type==="enquiry"?"PT Enquiry":r.type==="bootcamp"?"Bootcamp Join":"Group Join"}</p></div>
          <Badge color={T.warning}>Pending</Badge>
        </Card>)}
        {trainerBootcamps.filter(b=>b.status==="open").map(b=><Card key={b.id} style={{padding:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:T.accent+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><Dumbbell size={18} color={T.accent}/></div>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{b.title}</p><p style={{fontSize:12,color:T.textDim}}>Bootcamp · {b.date} · {b.attendees?.length||0}/{b.capacity} registered</p></div>
          <Badge color={T.accent}>Open</Badge>
        </Card>)}
        {trainerGroups.filter(g=>g.status==="open").map(g=><Card key={g.id} style={{padding:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:T.warning+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><Users size={18} color={T.warning}/></div>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{g.title}</p><p style={{fontSize:12,color:T.textDim}}>Group · {g.date} · {(g.capacity-g.spotsLeft)||0}/{g.capacity} registered</p></div>
          <Badge color={T.accent}>Open</Badge>
        </Card>)}
      </div>}
    </div>}

    {/* CLIENTS WEEKLY VIEW */}
    {dashTab==="clients"&&<div>
      <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>This Week's Clients</h3>
      {dayNames.map((day,di)=>{const dateStr=weekDays[di];const dayItems=[...ptClients.filter(c=>c.prefDate===dateStr&&c.status!=="cancelled").map(c=>({...c,bookType:"1-to-1",sessionName:c.userName,timeKey:c.prefTime})),...bcConfirmed.filter(b=>b.date===dateStr).map(b=>({...b,bookType:"Bootcamp",sessionName:b.title,timeKey:b.time})),...grConfirmed.filter(g=>g.date===dateStr).map(g=>({...g,bookType:"Group",sessionName:g.title,timeKey:g.time}))];return <div key={di} style={{marginBottom:dayItems.length?16:0}}>
        {dayItems.length>0&&<><p style={{fontSize:13,fontWeight:700,color:T.primaryLight,marginBottom:8}}>{day} — {new Date(dateStr).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</p>
        {dayItems.map((item,ii)=>{const gy=item.gym?GYMS_DB.find(g=>g.id===item.gym):null;return <Card key={item.id||ii} style={{padding:14,display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <Avatar name={item.sessionName||"Session"} size={36}/>
          <div style={{flex:1}}><p style={{fontWeight:600,fontSize:13}}>{item.sessionName}</p><div style={{display:"flex",gap:6,marginTop:3}}><Badge color={item.bookType==="1-to-1"?T.primary:item.bookType==="Bootcamp"?T.accent:T.warning}>{item.bookType}</Badge>{item.timeKey&&<Badge color={T.textDim}>{item.timeKey}</Badge>}{gy&&<Badge color={T.textDim}>{gy.name}</Badge>}</div></div>
          <Btn onClick={()=>setChat(item)} variant="secondary" size="sm"><MessageCircle size={14}/></Btn>
        </Card>})}</>}
      </div>})}
      {weekDays.every(d=>[...ptClients,...bcConfirmed,...grConfirmed].filter(x=>(x.prefDate||x.date)===d&&x.status!=="cancelled").length===0)&&<p style={{color:T.textDim}}>No sessions this week.</p>}
    </div>}

    {/* OVERVIEW — 3 clear category sections */}
    {dashTab==="overview"&&<div>
      {/* Category summary cards */}
      <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
        <Card onClick={()=>setDashTab("pt")} style={{padding:18,borderLeft:`4px solid ${T.primary}`,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.primary+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={22} color={T.primary}/></div>
          <div style={{flex:1}}><p style={{fontWeight:700,fontSize:15}}>1-to-1 Sessions</p><p style={{fontSize:12,color:T.textDim,marginTop:2}}>{ptUpcoming.length} upcoming · {ptClients.length} total</p></div>
          <ChevronRight size={18} color={T.textDim}/>
        </Card>
        <Card onClick={()=>setDashTab("bootcamps")} style={{padding:18,borderLeft:`4px solid ${T.accent}`,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.accent+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><Dumbbell size={22} color={T.accent}/></div>
          <div style={{flex:1}}><p style={{fontWeight:700,fontSize:15}}>Bootcamp Sessions</p><p style={{fontSize:12,color:T.textDim,marginTop:2}}>{bcUpcoming.length} upcoming · {bcConfirmed.length} total</p></div>
          <ChevronRight size={18} color={T.textDim}/>
        </Card>
        <Card onClick={()=>setDashTab("group")} style={{padding:18,borderLeft:`4px solid ${T.warning}`,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.warning+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><Users size={22} color={T.warning}/></div>
          <div style={{flex:1}}><p style={{fontWeight:700,fontSize:15}}>Group Sessions</p><p style={{fontSize:12,color:T.textDim,marginTop:2}}>{grUpcoming.length} upcoming · {grConfirmed.length} total</p></div>
          <ChevronRight size={18} color={T.textDim}/>
        </Card>
      </div>
      <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>Your Gyms</h3>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>{(userProfile.gyms||[]).map(gId=>{const g=GYMS_DB.find(x=>x.id===gId);return g?<Card key={gId} style={{display:"flex",alignItems:"center",gap:12,padding:14}}><MapPin size={18} color={gId===userProfile.homeGym?T.accent:T.textDim}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:14}}>{g.name}</p></div>{gId===userProfile.homeGym&&<Badge color={T.accent}>Home</Badge>}</Card>:null})}</div>
    </div>}

    {/* 1-TO-1 PT CLIENTS */}
    {dashTab==="pt"&&<div>
      {ptClients.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><User size={40} style={{marginBottom:12}}/><p>No accepted PT clients yet</p><p style={{fontSize:13,marginTop:4}}>Accept enquiries from Requests to see them here</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{ptClients.map(c=>{const gy=GYMS_DB.find(g=>g.id===c.gym);return <Card key={c.id} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={c.userName} size={48} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{c.userName}</p><p style={{fontSize:12,color:T.textDim}}>{c.userAge}y · {c.userGender}</p></div><Badge color={c.status==="completed"?T.textDim:T.success}>{c.status==="completed"?"Completed":"Accepted"}</Badge></div>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:4}}><strong style={{color:T.text}}>Goal:</strong> {c.goal}</p>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:4}}><MapPin size={11}/> {gy.name}</p>}
        <p style={{fontSize:12,color:T.textDim,marginBottom:8}}><Calendar size={11}/> {c.prefDate} · <Clock size={11}/> {c.prefTime}</p>
        {c.message&&<div style={{background:T.bgInput,borderRadius:T.radiusSm,padding:10,marginBottom:12}}><p style={{fontSize:12,color:T.textMuted,fontStyle:"italic"}}>"{c.message}"</p></div>}
        <div style={{display:"flex",gap:8}}>
          <Btn onClick={()=>setChat(c)} variant="primary" size="sm" style={{flex:1}}><MessageCircle size={14}/> Message</Btn>
          {c.status!=="completed"&&!isFuture(c.prefDate)&&<Btn onClick={()=>markComplete(c.id)} variant="success" size="sm"><Check size={14}/> Complete</Btn>}
          <Btn onClick={()=>cancelBooking(c.id)} variant="outlineDanger" size="sm"><X size={14}/></Btn>
        </div>
      </Card>})}</div>}
    </div>}

    {/* BOOTCAMPS — grouped by session */}
    {dashTab==="bootcamps"&&<div>
      {(()=>{const confirmed=trainerBootcamps.filter(b=>b.status==="confirmed");return confirmed.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Dumbbell size={40} style={{marginBottom:12}}/><p>No confirmed bootcamps yet</p><p style={{fontSize:13,color:T.textDim,marginTop:4}}>Confirm sessions from Services to manage them here</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:14}}>{confirmed.map(b=>{const gy=GYMS_DB.find(g=>g.id===b.gym);const reg=b.attendees?b.attendees.length:0;const st="Confirmed";return <Card key={b.id} style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{b.title}</h3><div style={{display:"flex",gap:6}}><Badge color={T.success}>{st}</Badge><Badge color={b.registrationStatus==="closed"?T.danger:T.accent}>{b.registrationStatus==="closed"?"Reg: Closed":"Reg: Open"}</Badge></div></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
          <Badge color={T.primaryLight}>{b.type}</Badge><Badge color={T.primary}><Calendar size={11}/> {b.date}</Badge><Badge color={T.accent}><Clock size={11}/> {b.time}</Badge><Badge color={T.accent}>{b.duration} min</Badge><Badge color={T.warning}>£{b.price}</Badge>
        </div>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:10}}><MapPin size={11}/> {gy.name}</p>}
        <div style={{display:"flex",gap:12,marginBottom:14}}>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{reg}</p><p style={{fontSize:11,color:T.textDim}}>Registered</p></div>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{b.capacity}</p><p style={{fontSize:11,color:T.textDim}}>Capacity</p></div>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:b.spotsLeft<=3?T.danger:T.success}}>{b.spotsLeft}</p><p style={{fontSize:11,color:T.textDim}}>Spots</p></div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <Btn onClick={()=>setViewAttendees(b)} variant="secondary" size="sm" style={{flex:1}}><Users size={14}/> Attendees ({reg})</Btn>
          <Btn onClick={()=>setMsgAllTarget(b)} variant="secondary" size="sm"><Send size={14}/></Btn>
          <Btn onClick={()=>{setTrainerBootcamps(bs=>bs.filter(x=>x.id!==b.id));showToast("Bootcamp cancelled")}} variant="outlineDanger" size="sm"><X size={14}/></Btn>
          {isFuture(b.date)?<Btn onClick={()=>{const newStatus=b.registrationStatus==="closed"?"open":"closed";setTrainerBootcamps(bs=>bs.map(x=>x.id===b.id?{...x,registrationStatus:newStatus}:x));showToast(newStatus==="closed"?"Joining closed for this session":"Joining re-opened for this session")}} variant={b.registrationStatus==="closed"?"outline":"secondary"} size="sm">{b.registrationStatus==="closed"?"Re-open Joining":"Close Joining"}</Btn>
          :<Btn onClick={()=>{setTrainerBootcamps(bs=>bs.map(x=>x.id===b.id?{...x,status:"completed"}:x));showToast("Bootcamp marked as completed")}} variant="success" size="sm"><Check size={14}/> Mark Completed</Btn>}
        </div>
      </Card>})}</div>})()}
    </div>}

    {/* GROUP — grouped by session */}
    {dashTab==="group"&&<div>
      {(()=>{const confirmed=trainerGroups.filter(g=>g.status==="confirmed");return confirmed.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p>No confirmed group sessions yet</p><p style={{fontSize:13,color:T.textDim,marginTop:4}}>Confirm sessions from Services to manage them here</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:14}}>{confirmed.map(g=>{const gy=GYMS_DB.find(x=>x.id===g.gym);const reg=g.capacity-g.spotsLeft;const st="Confirmed";return <Card key={g.id} style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{g.title}</h3><div style={{display:"flex",gap:6}}><Badge color={T.success}>{st}</Badge><Badge color={g.registrationStatus==="closed"?T.danger:T.accent}>{g.registrationStatus==="closed"?"Reg: Closed":"Reg: Open"}</Badge></div></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
          <Badge color={T.primaryLight}>{g.type}</Badge><Badge color={T.primary}><Calendar size={11}/> {g.date}</Badge><Badge color={T.accent}><Clock size={11}/> {g.time}</Badge><Badge color={T.accent}>{g.duration} min</Badge><Badge color={g.isFree?T.success:T.warning}>{g.isFree?"Free":`£${g.price}`}</Badge>
        </div>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:10}}><MapPin size={11}/> {gy.name}</p>}
        <div style={{display:"flex",gap:12,marginBottom:14}}>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{reg}</p><p style={{fontSize:11,color:T.textDim}}>Registered</p></div>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{g.capacity}</p><p style={{fontSize:11,color:T.textDim}}>Capacity</p></div>
          <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:g.spotsLeft<=1?T.danger:T.success}}>{g.spotsLeft}</p><p style={{fontSize:11,color:T.textDim}}>Spots</p></div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <Btn onClick={()=>setViewAttendees({...g,attendees:g.attendees||[]})} variant="secondary" size="sm" style={{flex:1}}><Users size={14}/> Attendees ({reg})</Btn>
          <Btn onClick={()=>setMsgAllTarget({...g,attendees:g.attendees||[]})} variant="secondary" size="sm"><Send size={14}/></Btn>
          <Btn onClick={()=>{setTrainerGroups(gs=>gs.filter(x=>x.id!==g.id));showToast("Session cancelled")}} variant="outlineDanger" size="sm"><X size={14}/></Btn>
          {isFuture(g.date)?<Btn onClick={()=>{const newStatus=g.registrationStatus==="closed"?"open":"closed";setTrainerGroups(gs=>gs.map(x=>x.id===g.id?{...x,registrationStatus:newStatus}:x));showToast(newStatus==="closed"?"Joining closed for this session":"Joining re-opened for this session")}} variant={g.registrationStatus==="closed"?"outline":"secondary"} size="sm">{g.registrationStatus==="closed"?"Re-open Joining":"Close Joining"}</Btn>
          :<Btn onClick={()=>{setTrainerGroups(gs=>gs.map(x=>x.id===g.id?{...x,status:"completed"}:x));showToast("Session marked as completed")}} variant="success" size="sm"><Check size={14}/> Mark Completed</Btn>}
        </div>
      </Card>})}</div>})()}
    </div>}
  </div>;
};

// ═══ TRAINER SERVICES SCREEN ═══
const TrainerServicesScreen=({userProfile,trainerBootcamps,setTrainerBootcamps,trainerGroups,setTrainerGroups,trainerReqs,setTrainerReqs,acceptedBookings,setAcceptedBookings})=>{
  const[tab,setTab]=useState("pt");
  const[subView,setSubView]=useState(null);
  const[subData,setSubData]=useState(null);
  const[chat,setChat]=useState(null);
  const[groupChat,setGroupChat]=useState(null);
  const[gcMsgs,setGcMsgs]=useState({});
  const[gcDraft,setGcDraft]=useState("");
  const gcSend=()=>{if(!gcDraft.trim()||!groupChat)return;const id=groupChat.id;setGcMsgs(m=>({...m,[id]:[...(m[id]||[]),{from:"me",text:gcDraft.trim(),ts:"Now"}]}));setGcDraft("")};
  const[viewProfile,setViewProfile]=useState(null);
  const tid=userProfile.trainerId||"t1";
  const bootcamps=trainerBootcamps||[];
  const groups=trainerGroups||[];
  const setBootcamps=setTrainerBootcamps||(()=>{});
  const setGroups=setTrainerGroups||(()=>{});
  const pendingEnquiries=(trainerReqs||[]).filter(r=>r.type==="enquiry");
  const[ptRate,setPtRate]=useState(userProfile.rate||55);
  const[ptAvailability,setPtAvailability]=useState("Mon–Fri, 6am–9pm");
  const[toast,setToast]=useState(null);
  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2500)};
  // ALL form state hoisted unconditionally to avoid React hooks-order error
  const[fRate,setFRate]=useState(ptRate);
  const[fAvail,setFAvail]=useState(ptAvailability);
  const[bName,setBName]=useState("");const[bType,setBType]=useState("");const[bDate,setBDate]=useState("");const[bTime,setBTime]=useState("");const[bDur,setBDur]=useState("");const[bPrice,setBPrice]=useState("");const[bCap,setBCap]=useState("");const[bGym,setBGym]=useState(userProfile.gyms?.[0]||"");
  const[gName,setGName]=useState("");const[gType,setGType]=useState("");const[gDate,setGDate]=useState("");const[gTime,setGTime]=useState("");const[gDur,setGDur]=useState("");const[gPrice,setGPrice]=useState("");const[gCap,setGCap]=useState("");const[gGym,setGGym]=useState(userProfile.gyms?.[0]||"");const[gFree,setGFree]=useState(false);
  // Reset form state when entering a sub-view
  useEffect(()=>{
    if(subView==="editRate")setFRate(ptRate);
    if(subView==="editAvail")setFAvail(ptAvailability);
    if(subView==="postBootcamp"){setBName("");setBType("");setBDate("");setBTime("");setBDur("");setBPrice("");setBCap("");setBGym(userProfile.gyms?.[0]||"")}
    if(subView==="editBootcamp"&&subData){setBName(subData.title||"");setBType(subData.type||"");setBDate(subData.date||"");setBTime(subData.time||"");setBDur(String(subData.duration||""));setBPrice(String(subData.price||""));setBCap(String(subData.capacity||""));setBGym(subData.gym||"")}
    if(subView==="postGroup"){setGName("");setGType("");setGDate("");setGTime("");setGDur("");setGPrice("");setGCap("");setGGym(userProfile.gyms?.[0]||"");setGFree(false)}
    if(subView==="editGroup"&&subData){setGName(subData.title||"");setGType(subData.type||"");setGDate(subData.date||"");setGTime(subData.time||"");setGDur(String(subData.duration||""));setGPrice(String(subData.price||""));setGCap(String(subData.capacity||""));setGGym(subData.gym||"");setGFree(!!subData.isFree)}
  },[subView,subData]);
  const tabs=[{key:"pt",label:"1-to-1 PT"},{key:"bootcamps",label:`Bootcamps (${bootcamps.length})`},{key:"group",label:`Group (${groups.length})`}];
  const gyms=(userProfile.gyms||[]).map(gId=>GYMS_DB.find(g=>g.id===gId)).filter(Boolean);

  // ── Chat rendering ──
  if(chat)return <ChatModal user={{name:chat.userName||chat.name||"Client",...chat}} onClose={()=>setChat(null)}/>;
  if(groupChat){
    const gy=GYMS_DB.find(g=>g.id===groupChat.gym);
    const msgs=gcMsgs[groupChat.id]||[];
    return <div style={{position:"fixed",inset:0,zIndex:200,background:T.bg,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setGroupChat(null)} style={{background:"none",border:"none",cursor:"pointer"}}><ArrowLeft size={20} color={T.textMuted}/></button>
        <div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{groupChat.title}</p><p style={{fontSize:11,color:T.textDim}}>{groupChat.date} · {groupChat.time}{gy?` · ${gy.name}`:""}</p></div>
        <Badge color={T.accent}>{groupChat.attendees?.length||0} members</Badge>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{alignSelf:"flex-start",maxWidth:"75%"}}><div style={{padding:"10px 14px",borderRadius:14,background:T.bgCard,color:T.text,fontSize:14,lineHeight:1.5}}>Welcome to {groupChat.title}! Use this chat for session updates.</div><p style={{fontSize:10,color:T.textDim,marginTop:4}}>System</p></div>
        {msgs.map((m,i)=><div key={i} style={{alignSelf:m.from==="me"?"flex-end":"flex-start",maxWidth:"75%"}}><div style={{padding:"10px 14px",borderRadius:14,background:m.from==="me"?T.primary:T.bgCard,color:m.from==="me"?"#fff":T.text,fontSize:14,lineHeight:1.5}}>{m.text}</div><p style={{fontSize:10,color:T.textDim,marginTop:4,textAlign:m.from==="me"?"right":"left"}}>{m.ts}</p></div>)}
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`,display:"flex",gap:10}}>
        <input value={gcDraft} onChange={e=>setGcDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gcSend()} placeholder="Message group..." style={{flex:1,padding:"10px 14px",background:T.bgInput,border:`1px solid ${T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:14,outline:"none"}}/>
        <Btn onClick={gcSend} size="sm" disabled={!gcDraft.trim()}><Send size={16}/></Btn>
      </div>
    </div>;
  }

  // ── Sub-view: Edit Rate ──
  if(subView==="editRate"){
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setSubView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Edit Hourly Rate</h2>
      <div style={{position:"relative",marginBottom:24}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:T.textDim,fontSize:18,fontWeight:700}}>£</span>
        <input type="number" value={fRate} onChange={e=>setFRate(e.target.value)} style={{width:"100%",padding:"14px 16px 14px 34px",background:T.bgInput,border:`1.5px solid ${T.border}`,borderRadius:T.radiusSm,color:T.text,fontSize:18,fontWeight:700,outline:"none"}}/>
      </div>
      <Btn onClick={()=>{setPtRate(+fRate);showToast("Rate updated");setSubView(null)}} size="lg" style={{width:"100%"}}>Save Rate</Btn>
    </div>;
  }

  // ── Sub-view: Edit Availability ──
  if(subView==="editAvail"){
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setSubView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Edit Availability</h2>
      <TextArea value={fAvail} onChange={e=>setFAvail(e.target.value)} label="Your available hours" placeholder="e.g. Mon–Fri 6am–9pm, Sat 8am–2pm" style={{minHeight:100,marginBottom:24}}/>
      <Btn onClick={()=>{setPtAvailability(fAvail);showToast("Availability updated");setSubView(null)}} size="lg" style={{width:"100%"}}>Save Availability</Btn>
    </div>;
  }

  // ── Sub-view: View Enquiries with profile drill-down ──
  if(subView==="enquiries"){
    if(viewProfile){const r=viewProfile;const gy=GYMS_DB.find(g=>g.id===r.gym);return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setViewProfile(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back to Enquiries</button>
      <div style={{textAlign:"center",marginBottom:20}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Avatar name={r.userName} size={80} verified={true}/></div><h2 style={{fontSize:22,fontWeight:800}}>{r.userName}</h2><p style={{fontSize:14,color:T.textMuted,marginTop:4}}>{r.userAge}y · {r.userGender}</p><div style={{marginTop:8}}><Badge color={T.accent} glow>Verified ✓</Badge></div></div>
      <div style={{marginBottom:20}}>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:6}}><strong style={{color:T.text}}>Goal:</strong> {r.goal}</p>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:4}}><MapPin size={11}/> {gy.name}</p>}
        <p style={{fontSize:12,color:T.textDim,marginBottom:8}}><Calendar size={11}/> {r.prefDate} · <Clock size={11}/> {r.prefTime}</p>
        {r.message&&<div style={{background:T.bgInput,borderRadius:T.radiusSm,padding:12,marginBottom:8}}><p style={{fontSize:13,color:T.textMuted,fontStyle:"italic"}}>"{r.message}"</p></div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <Btn onClick={()=>{setViewProfile(null);setChat(r)}} variant="primary" size="lg" style={{width:"100%"}}><MessageCircle size={16}/> Message {r.userName}</Btn>
        <div style={{display:"flex",gap:10}}>
          <Btn onClick={()=>{setAcceptedBookings(b=>[...b,{...r,status:"accepted",acceptedAt:new Date().toISOString()}]);setTrainerReqs(rq=>rq.filter(x=>x.id!==r.id));setViewProfile(null);showToast("Enquiry accepted and moved to Dashboard")}} variant="success" size="lg" style={{flex:1}}><Check size={16}/> Accept</Btn>
          <Btn onClick={()=>{setTrainerReqs(rq=>rq.filter(x=>x.id!==r.id));setViewProfile(null);showToast("Enquiry declined")}} variant="outlineDanger" size="lg" style={{flex:1}}><X size={16}/> Decline</Btn>
        </div>
      </div>
    </div>}
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setSubView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>PT Enquiries ({pendingEnquiries.length})</h2>
      {pendingEnquiries.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Check size={40} style={{marginBottom:12}}/><p>All enquiries handled</p></div>:
      <div style={{display:"flex",flexDirection:"column",gap:12}}>{pendingEnquiries.map(r=>{const gy=GYMS_DB.find(g=>g.id===r.gym);return <Card key={r.id} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><Avatar name={r.userName} size={44} verified={true}/><div style={{flex:1}}><p style={{fontWeight:600,fontSize:15}}>{r.userName}</p><p style={{fontSize:12,color:T.textDim}}>{r.userAge}y · {r.userGender}</p></div><Badge color={T.primaryLight}>Pending</Badge></div>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:4}}><strong style={{color:T.text}}>Goal:</strong> {r.goal}</p>
        {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:4}}><MapPin size={11}/> {gy.name}</p>}
        <p style={{fontSize:12,color:T.textDim,marginBottom:8}}><Calendar size={11}/> {r.prefDate} · <Clock size={11}/> {r.prefTime}</p>
        {r.message&&<div style={{background:T.bgInput,borderRadius:T.radiusSm,padding:12,marginBottom:14}}><p style={{fontSize:13,color:T.textMuted,lineHeight:1.5,fontStyle:"italic"}}>"{r.message}"</p></div>}
        <div style={{display:"flex",gap:8}}>
          <Btn onClick={()=>setViewProfile(r)} variant="secondary" size="sm"><Eye size={14}/> Profile</Btn>
          <Btn onClick={()=>setChat(r)} variant="secondary" size="sm"><MessageCircle size={14}/></Btn>
          <Btn onClick={()=>{setAcceptedBookings(b=>[...b,{...r,status:"accepted",acceptedAt:new Date().toISOString()}]);setTrainerReqs(rq=>rq.filter(x=>x.id!==r.id));showToast("Enquiry accepted and moved to Dashboard")}} variant="success" size="sm" style={{flex:1}}><Check size={14}/> Accept</Btn>
          <Btn onClick={()=>{setTrainerReqs(rq=>rq.filter(x=>x.id!==r.id));showToast("Enquiry declined")}} variant="outlineDanger" size="sm"><X size={14}/></Btn>
        </div>
      </Card>})}</div>}
    </div>;
  }

  // ── Sub-view: View Attendees with profile drill-down ──
  if(subView==="attendees"&&subData){
    if(viewProfile){const u=viewProfile;return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>setViewProfile(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back to Attendees</button>
      <div style={{textAlign:"center",marginBottom:24}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Avatar name={u.name} size={80} verified={true}/></div><h2 style={{fontSize:22,fontWeight:800}}>{u.name}</h2><p style={{fontSize:14,color:T.textMuted,marginTop:4}}>{u.age}y · {u.gender} · {u.fitnessLevel}</p><div style={{marginTop:8}}><Badge color={T.accent} glow>Verified ✓</Badge></div></div>
      <p style={{fontSize:14,color:T.textMuted,lineHeight:1.6,marginBottom:24}}>{u.bio||"No bio."}</p>
      <Btn onClick={()=>{setViewProfile(null);setSubView(null);setSubData(null);setChat(u)}} variant="primary" size="lg" style={{width:"100%"}}><MessageCircle size={16}/> Message {u.name}</Btn>
    </div>}
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>{setSubView(null);setSubData(null)}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:8}}>Attendees</h2>
      <p style={{color:T.textMuted,fontSize:14,marginBottom:16}}>{subData.title} — {subData.attendees?.length||0} registered</p>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <Btn onClick={()=>{setSubView(null);setSubData(null);setGroupChat(subData)}} variant="primary" size="sm" style={{flex:1}}><MessageCircle size={14}/> Open Group Chat</Btn>
        <Btn onClick={()=>{showToast(`Message sent to ${subData.attendees?.length||0} attendees`)}} variant="secondary" size="sm"><Send size={14}/> All</Btn>
      </div>
      {(subData.attendees||[]).length===0?<p style={{color:T.textDim}}>No attendees yet.</p>:
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{subData.attendees.map(uid=>{const u=MOCK_USERS.find(x=>x.id===uid);return u?<Card key={uid} style={{display:"flex",alignItems:"center",gap:14,padding:16,cursor:"pointer"}}>
        <Avatar name={u.name} size={44} verified={true}/>
        <div onClick={()=>setViewProfile(u)} style={{flex:1,cursor:"pointer"}}><p style={{fontWeight:600,fontSize:14}}>{u.name}</p><p style={{fontSize:12,color:T.textDim}}>{u.age}y · {u.gender}</p><p style={{fontSize:12,color:T.textDim,marginTop:2}}>{u.bio?.substring(0,80)}{u.bio?.length>80?"...":""}</p></div>
        <div style={{display:"flex",gap:6}}>
          <Btn onClick={()=>setViewProfile(u)} variant="ghost" size="sm"><Eye size={14}/></Btn>
          <Btn onClick={()=>{setSubView(null);setSubData(null);setChat(u)}} variant="secondary" size="sm"><MessageCircle size={14}/></Btn>
        </div>
      </Card>:null})}</div>}
    </div>;
  }

  // ── Sub-view: Post / Edit Bootcamp ──
  if(subView==="postBootcamp"||subView==="editBootcamp"){
    const editing=subView==="editBootcamp"&&subData;
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>{setSubView(null);setSubData(null)}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>{editing?"Edit Bootcamp":"Post New Bootcamp"}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:24}}>
        <Input label="Bootcamp Name" placeholder="e.g. Dawn HIIT Blast" value={bName} onChange={e=>setBName(e.target.value)}/>
        <Input label="Workout Type" placeholder="e.g. HIIT, Boxing, Yoga" value={bType} onChange={e=>setBType(e.target.value)}/>
        <CalendarPicker label="Date" value={bDate} onChange={v=>setBDate(v)} minDate={new Date().toISOString().slice(0,10)}/>
        <Sel label="Start Time" value={bTime} onChange={e=>setBTime(e.target.value)}><option value="">Time...</option>{TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}</Sel>
        <div><label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:8}}>Duration</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{DURATIONS.map(d=><Chip key={d} label={`${d} min`} selected={bDur===String(d)} onClick={()=>setBDur(String(d))}/>)}</div></div>
        <div style={{display:"flex",gap:12}}>
          <Input label="Price (£)" inputMode="numeric" placeholder="15" value={bPrice} onChange={e=>setBPrice(e.target.value.replace(/[^0-9]/g,""))} containerStyle={{flex:1}}/>
          <Input label="Capacity" inputMode="numeric" placeholder="16" value={bCap} onChange={e=>setBCap(e.target.value.replace(/[^0-9]/g,""))} containerStyle={{flex:1}}/>
        </div>
        <Sel label="Gym / Location" value={bGym} onChange={e=>setBGym(e.target.value)}><option value="">Select gym...</option>{gyms.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</Sel>
      </div>
      <Btn onClick={()=>{
        if(!bName||!bType||!bDate||!bTime||!bDur||!bPrice||!bCap){showToast("Please fill all required fields");return}
        if(editing){setBootcamps(bs=>bs.map(b=>b.id===subData.id?{...b,title:bName,type:bType,date:bDate,time:bTime,duration:+bDur,price:+bPrice,capacity:+bCap,gym:bGym}:b));showToast("Bootcamp updated")}
        else{const payload={id:"b-"+Date.now(),trainerId:tid,title:bName,type:bType,date:bDate,time:bTime,duration:+bDur,price:+bPrice,capacity:+bCap,spotsLeft:+bCap,gym:bGym,attendees:[],status:"open",createdAt:new Date().toISOString()};console.log("Creating bootcamp:",payload);setBootcamps(bs=>{const next=[...bs,payload];console.log("Bootcamps after add:",next.length);return next});showToast("Bootcamp posted successfully")}
        setSubView(null);setSubData(null);
      }} size="lg" style={{width:"100%"}} disabled={!bName||!bType||!bDate||!bTime}>{editing?"Save Changes":"Post Bootcamp"}</Btn>
    </div>;
  }

  // ── Sub-view: Post / Edit Group Session ──
  if(subView==="postGroup"||subView==="editGroup"){
    const editing=subView==="editGroup"&&subData;
    return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
      <button onClick={()=>{setSubView(null);setSubData(null)}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>{editing?"Edit Group Session":"Post Group Session"}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:24}}>
        <Input label="Session Name" placeholder="e.g. Open Gym: Strength Coaching" value={gName} onChange={e=>setGName(e.target.value)}/>
        <Input label="Workout Type" placeholder="e.g. Strength, CrossFit" value={gType} onChange={e=>setGType(e.target.value)}/>
        <CalendarPicker label="Date" value={gDate} onChange={v=>setGDate(v)} minDate={new Date().toISOString().slice(0,10)}/>
        <Sel label="Start Time" value={gTime} onChange={e=>setGTime(e.target.value)}><option value="">Time...</option>{TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}</Sel>
        <div><label style={{display:"block",fontSize:13,fontWeight:500,color:T.textMuted,marginBottom:8}}>Duration</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{DURATIONS.map(d=><Chip key={d} label={`${d} min`} selected={gDur===String(d)} onClick={()=>setGDur(String(d))}/>)}</div></div>
        <div onClick={()=>setGFree(!gFree)} style={{display:"flex",alignItems:"center",gap:14,padding:"8px 0",cursor:"pointer"}}>
          <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${gFree?T.success:T.border}`,background:gFree?T.success:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{gFree&&<Check size={14} color="#fff"/>}</div>
          <span style={{fontSize:14,color:gFree?T.text:T.textMuted}}>Free session (no charge)</span>
        </div>
        {!gFree&&<Input label="Price (£)" inputMode="numeric" placeholder="25" value={gPrice} onChange={e=>setGPrice(e.target.value.replace(/[^0-9]/g,""))}/>}
        <Input label="Capacity (spots)" inputMode="numeric" placeholder="4" value={gCap} onChange={e=>setGCap(e.target.value.replace(/[^0-9]/g,""))}/>
        <Sel label="Gym / Location" value={gGym} onChange={e=>setGGym(e.target.value)}><option value="">Select gym...</option>{gyms.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</Sel>
      </div>
      <Btn onClick={()=>{
        if(!gName||!gType||!gDate||!gTime||!gDur||!gCap){showToast("Please fill all required fields");return}
        if(editing){setGroups(gs=>gs.map(g=>g.id===subData.id?{...g,title:gName,type:gType,date:gDate,time:gTime,duration:+gDur,price:gFree?0:+gPrice,capacity:+gCap,gym:gGym,isFree:gFree}:g));showToast("Session updated")}
        else{const payload={id:"gr-"+Date.now(),trainerId:tid,title:gName,type:gType,date:gDate,time:gTime,duration:+gDur,price:gFree?0:(+gPrice||0),capacity:+gCap,spotsLeft:+gCap,gym:gGym,isFree:gFree,attendees:[],status:"open",createdAt:new Date().toISOString()};console.log("Creating group session:",payload);setGroups(gs=>{const next=[...gs,payload];console.log("Groups after add:",next.length);return next});showToast("Group session posted successfully")}
        setSubView(null);setSubData(null);
      }} size="lg" style={{width:"100%"}} disabled={!gName||!gType||!gDate||!gTime}>{editing?"Save Changes":"Post Session"}</Btn>
    </div>;
  }

  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>{toast}</div>}
    <div style={{marginBottom:20}}><h1 style={{fontSize:26,fontWeight:800}}>My Services</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Manage what you offer</p></div>
    <div style={{display:"flex",gap:8,marginBottom:24,overflowX:"auto",paddingBottom:4}}>{tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"8px 16px",borderRadius:999,fontSize:13,fontWeight:600,whiteSpace:"nowrap",background:tab===t.key?T.primary+"22":T.bgInput,color:tab===t.key?T.primaryLight:T.textMuted,border:`1.5px solid ${tab===t.key?T.primary:T.border}`,cursor:"pointer",fontFamily:T.font}}>{t.label}</button>)}</div>

    {/* 1-TO-1 PT */}
    {tab==="pt"&&<div>
      <Card style={{padding:20,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
          <div style={{width:52,height:52,borderRadius:16,background:T.primary+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={26} color={T.primary}/></div>
          <div style={{flex:1}}><h3 style={{fontSize:17,fontWeight:700}}>1-to-1 Personal Training</h3><p style={{fontSize:13,color:T.textMuted,marginTop:2}}>Your personal training offer</p></div>
          <Badge color={T.success} glow>Active</Badge>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
          <Badge color={T.success}>£{ptRate}/hr</Badge>
          <Badge color={T.primary}>{pendingEnquiries.length} enquiries</Badge>
          <Badge color={T.accent}>{(acceptedBookings||[]).filter(b=>b.type==="enquiry"&&b.status!=="cancelled").length} accepted clients</Badge>
        </div>
        <div style={{marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:6}}>Availability</p><p style={{fontSize:13,color:T.textMuted}}>{ptAvailability}</p></div>
        <div style={{marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:6}}>Locations</p>{gyms.map(g=><div key={g.id} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}><MapPin size={13} color={T.accent}/><span style={{fontSize:13,color:T.textMuted}}>{g.name}</span></div>)}</div>
        <div style={{marginBottom:16}}><p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:6}}>Specialties</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(userProfile.specialties||["Strength","HIIT"]).map(s=><Badge key={s} color={T.accent}>{s}</Badge>)}</div></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Btn onClick={()=>setSubView("editRate")} variant="secondary" size="sm" style={{flex:1}}><Edit size={14}/> Edit Rate</Btn><Btn onClick={()=>setSubView("editAvail")} variant="secondary" size="sm" style={{flex:1}}><Calendar size={14}/> Edit Availability</Btn><Btn onClick={()=>setSubView("enquiries")} variant="primary" size="sm" style={{flex:1}}><Send size={14}/> View Enquiries</Btn></div>
      </Card>
    </div>}

    {/* BOOTCAMPS — show only open/active, not confirmed */}
    {tab==="bootcamps"&&<div>
      {(()=>{const openBc=bootcamps.filter(b=>b.status!=="confirmed"&&b.status!=="completed");return openBc.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Dumbbell size={40} style={{marginBottom:12}}/><p style={{fontSize:15}}>No open bootcamps</p><Btn onClick={()=>setSubView("postBootcamp")} variant="primary" size="sm" style={{marginTop:16}}><Plus size={14}/> Post Bootcamp</Btn></div>:
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Btn onClick={()=>setSubView("postBootcamp")} variant="primary" size="sm" style={{alignSelf:"flex-start"}}><Plus size={14}/> Post Bootcamp</Btn>
        {openBc.map(b=>{const gy=GYMS_DB.find(g=>g.id===b.gym);const registered=b.attendees?b.attendees.length:0;const status=b.spotsLeft===0?"Full":"Open";return <Card key={b.id} style={{padding:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{b.title}</h3><Badge color={status==="Full"?T.danger:T.success}>{status}</Badge></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <Badge color={T.primaryLight}>{b.type}</Badge>
            <Badge color={T.primary}><Calendar size={11}/> {b.date}</Badge>
            <Badge color={T.accent}><Clock size={11}/> {b.time}</Badge>
            <Badge color={T.accent}>{b.duration} min</Badge>
            <Badge color={T.warning}>£{b.price}</Badge>
          </div>
          {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:8}}><MapPin size={11}/> {gy.name}</p>}
          <div style={{display:"flex",gap:12,marginBottom:14}}>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{registered}</p><p style={{fontSize:11,color:T.textDim}}>Registered</p></div>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{b.capacity}</p><p style={{fontSize:11,color:T.textDim}}>Capacity</p></div>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:b.spotsLeft<=3?T.danger:T.success}}>{b.spotsLeft}</p><p style={{fontSize:11,color:T.textDim}}>Spots left</p></div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn onClick={()=>{setSubData(b);setSubView("attendees")}} variant="secondary" size="sm" style={{flex:1}}><Users size={14}/> Attendees</Btn>
            <Btn onClick={()=>setGroupChat(b)} variant="primary" size="sm"><MessageCircle size={14}/></Btn>
            <Btn onClick={()=>{setSubData(b);setSubView("editBootcamp")}} variant="secondary" size="sm"><Edit size={14}/></Btn>
            <Btn onClick={()=>{setBootcamps(bs=>bs.filter(x=>x.id!==b.id));showToast("Bootcamp cancelled")}} variant="outlineDanger" size="sm"><X size={14}/></Btn>
          </div>
          {b.spotsLeft>0&&<p style={{fontSize:12,color:T.warning,marginTop:10}}>Need {b.spotsLeft} more to fill. You can still confirm.</p>}
          <Btn onClick={()=>{console.log("Confirming bootcamp:",b.id);setBootcamps(bs=>{const next=bs.map(x=>x.id===b.id?{...x,status:"confirmed"}:x);console.log("Bootcamps after confirm:",next.filter(x=>x.status==="confirmed").length,"confirmed");return next});showToast("Bootcamp confirmed and moved to Dashboard")}} variant="success" size="sm" style={{width:"100%",marginTop:8}}><Check size={14}/> Confirm and move to Dashboard</Btn>
        </Card>})}
      </div>})()}
    </div>}

    {/* GROUP TRAINING — show only open/active, not confirmed */}
    {tab==="group"&&<div>
      {(()=>{const openGr=groups.filter(g=>g.status!=="confirmed"&&g.status!=="completed");return openGr.length===0?<div style={{textAlign:"center",padding:40,color:T.textDim}}><Users size={40} style={{marginBottom:12}}/><p style={{fontSize:15}}>No open group sessions</p><Btn onClick={()=>setSubView("postGroup")} variant="primary" size="sm" style={{marginTop:16}}><Plus size={14}/> Post Group Session</Btn></div>:
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Btn onClick={()=>setSubView("postGroup")} variant="primary" size="sm" style={{alignSelf:"flex-start"}}><Plus size={14}/> Post Group Session</Btn>
        {openGr.map(g=>{const gy=GYMS_DB.find(x=>x.id===g.gym);const registered=g.capacity-g.spotsLeft;const status=g.spotsLeft===0?"Full":"Open";return <Card key={g.id} style={{padding:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:16,fontWeight:700}}>{g.title}</h3><Badge color={status==="Full"?T.danger:T.success}>{status}</Badge></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <Badge color={T.primaryLight}>{g.type}</Badge>
            <Badge color={T.primary}><Calendar size={11}/> {g.date}</Badge>
            <Badge color={T.accent}><Clock size={11}/> {g.time}</Badge>
            <Badge color={T.accent}>{g.duration} min</Badge>
            <Badge color={g.isFree?T.success:T.warning}>{g.isFree?"Free":`£${g.price}`}</Badge>
          </div>
          {gy&&<p style={{fontSize:12,color:T.textDim,marginBottom:8}}><MapPin size={11}/> {gy.name}</p>}
          <div style={{display:"flex",gap:12,marginBottom:14}}>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{registered}</p><p style={{fontSize:11,color:T.textDim}}>Registered</p></div>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:T.text}}>{g.capacity}</p><p style={{fontSize:11,color:T.textDim}}>Capacity</p></div>
            <div style={{padding:"8px 14px",background:T.bgInput,borderRadius:T.radiusSm,flex:1,textAlign:"center"}}><p style={{fontSize:18,fontWeight:700,color:g.spotsLeft<=1?T.danger:T.success}}>{g.spotsLeft}</p><p style={{fontSize:11,color:T.textDim}}>Spots left</p></div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn onClick={()=>{setSubData({...g,attendees:g.attendees||[]});setSubView("attendees")}} variant="secondary" size="sm" style={{flex:1}}><Users size={14}/> Attendees</Btn>
            <Btn onClick={()=>setGroupChat({...g,attendees:g.attendees||[]})} variant="primary" size="sm"><MessageCircle size={14}/></Btn>
            <Btn onClick={()=>{setSubData(g);setSubView("editGroup")}} variant="secondary" size="sm"><Edit size={14}/></Btn>
            <Btn onClick={()=>{setGroups(gs=>gs.filter(x=>x.id!==g.id));showToast("Session cancelled")}} variant="outlineDanger" size="sm"><X size={14}/></Btn>
          </div>
          {g.spotsLeft>0&&<p style={{fontSize:12,color:T.warning,marginTop:10}}>Need {g.spotsLeft} more to fill. You can still confirm.</p>}
          <Btn onClick={()=>{console.log("Confirming group session:",g.id);setGroups(gs=>{const next=gs.map(x=>x.id===g.id?{...x,status:"confirmed"}:x);console.log("Groups after confirm:",next.filter(x=>x.status==="confirmed").length,"confirmed");return next});showToast("Session confirmed and moved to Dashboard")}} variant="success" size="sm" style={{width:"100%",marginTop:8}}><Check size={14}/> Confirm and move to Dashboard</Btn>
        </Card>})}
      </div>})()}
    </div>}
  </div>;
};

// ═══ MAKE IT COUNT — Gym Member PR Tracker ═══
const MakeItCountScreen=({userProfile,onBack})=>{
  const exercises=[
    {key:"rdl",name:"Romanian Deadlift",unit:"kg",icon:"🏋️"},
    {key:"bench",name:"Bench Press",unit:"kg",icon:"💪"},
    {key:"squat",name:"Squat",unit:"kg",icon:"🦵"},
    {key:"curls",name:"Arm Curls",unit:"kg",icon:"💥"},
    {key:"pullups",name:"Pull Ups",unit:"reps",icon:"🔝"},
  ];
  const[prs,setPrs]=useState(()=>{try{return window._glPRs||{}}catch(e){return{}}});
  const[editing,setEditing]=useState(null);
  const[fWeight,setFWeight]=useState("");
  const[fReps,setFReps]=useState("");
  const[fDate,setFDate]=useState(new Date().toISOString().slice(0,10));
  const[fNotes,setFNotes]=useState("");
  const[fAddedWeight,setFAddedWeight]=useState("");
  const[toast,setToast]=useState(null);
  const showToast=m=>{setToast(m);setTimeout(()=>setToast(null),2500)};

  useEffect(()=>{window._glPRs=prs},[prs]);

  const openEdit=(key)=>{
    const cur=prs[key];
    setEditing(key);
    setFWeight(cur?.weight?.toString()||"");
    setFReps(cur?.reps?.toString()||"");
    setFDate(cur?.date||new Date().toISOString().slice(0,10));
    setFNotes(cur?.notes||"");
    setFAddedWeight(cur?.addedWeight?.toString()||"");
  };

  const savePR=()=>{
    if(!editing)return;
    const isPullups=editing==="pullups";
    if(!isPullups&&!fWeight){showToast("Enter weight");return}
    if(!fReps){showToast("Enter reps");return}
    const prev=prs[editing];
    const history=prev?.history||[];
    if(prev?.weight||prev?.reps)history.unshift({weight:prev.weight,reps:prev.reps,date:prev.date,notes:prev.notes,addedWeight:prev.addedWeight});
    const entry={weight:isPullups?null:+fWeight,reps:+fReps,date:fDate,notes:fNotes,addedWeight:isPullups&&fAddedWeight?+fAddedWeight:null,history:history.slice(0,5)};
    setPrs(p=>({...p,[editing]:entry}));
    setEditing(null);
    showToast("PR updated!");
  };

  return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>{toast}</div>}

    {/* Edit modal */}
    {editing&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setEditing(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bgCard,borderRadius:T.radiusMd,padding:24,width:"100%",maxWidth:400,border:`1px solid ${T.border}`}}>
        <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Update {exercises.find(e=>e.key===editing)?.name}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {editing!=="pullups"&&<Input label="Weight (kg)" inputMode="numeric" placeholder="e.g. 100" value={fWeight} onChange={e=>setFWeight(e.target.value.replace(/[^0-9.]/g,""))}/>}
          <Input label={editing==="pullups"?"Max Reps":"Reps"} inputMode="numeric" placeholder="e.g. 8" value={fReps} onChange={e=>setFReps(e.target.value.replace(/[^0-9]/g,""))}/>
          {editing==="pullups"&&<Input label="Added Weight (kg, optional)" inputMode="numeric" placeholder="e.g. 10" value={fAddedWeight} onChange={e=>setFAddedWeight(e.target.value.replace(/[^0-9.]/g,""))}/>}
          <CalendarPicker label="Date" value={fDate} onChange={v=>setFDate(v)} minDate={new Date().toISOString().slice(0,10)}/>
          <Input label="Notes (optional)" placeholder="e.g. felt strong, new grip" value={fNotes} onChange={e=>setFNotes(e.target.value)}/>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <Btn onClick={()=>setEditing(null)} variant="secondary" size="lg" style={{flex:1}}>Cancel</Btn>
          <Btn onClick={savePR} variant="primary" size="lg" style={{flex:1}}>Save PR</Btn>
        </div>
      </div>
    </div>}

    <button onClick={onBack} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
    <div style={{marginBottom:24}}><h1 style={{fontSize:26,fontWeight:800}}>Make It Count</h1><p style={{color:T.textMuted,fontSize:14,marginTop:4}}>Track your numbers. Beat your last best.</p></div>

    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {exercises.map(ex=>{const pr=prs[ex.key];const isPullups=ex.key==="pullups";return <Card key={ex.key} style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
          <span style={{fontSize:28}}>{ex.icon}</span>
          <div style={{flex:1}}><p style={{fontWeight:700,fontSize:16}}>{ex.name}</p>{!pr&&<p style={{fontSize:12,color:T.textDim}}>No PR recorded yet</p>}</div>
        </div>
        {pr&&<div style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:6}}>
            {!isPullups&&<p style={{fontSize:32,fontWeight:800,color:T.primaryLight}}>{pr.weight}<span style={{fontSize:14,fontWeight:600,color:T.textMuted}}> kg</span></p>}
            <p style={{fontSize:isPullups?32:20,fontWeight:isPullups?800:700,color:isPullups?T.primaryLight:T.accent}}>{pr.reps}<span style={{fontSize:14,fontWeight:600,color:T.textMuted}}> reps</span></p>
            {isPullups&&pr.addedWeight&&<p style={{fontSize:16,fontWeight:600,color:T.accent}}>+{pr.addedWeight}<span style={{fontSize:12,color:T.textDim}}> kg</span></p>}
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Badge color={T.textDim}><Calendar size={10}/> {pr.date}</Badge>
            {pr.notes&&<Badge color={T.accent}>{pr.notes}</Badge>}
          </div>
          {pr.history&&pr.history.length>0&&<div style={{marginTop:12,borderTop:`1px solid ${T.border}`,paddingTop:10}}>
            <p style={{fontSize:11,fontWeight:600,color:T.textDim,marginBottom:6}}>Previous</p>
            {pr.history.map((h,i)=><p key={i} style={{fontSize:12,color:T.textMuted,marginBottom:3}}>
              {!isPullups&&`${h.weight}kg × `}{h.reps} reps{isPullups&&h.addedWeight?` +${h.addedWeight}kg`:""} — {h.date}
            </p>)}
          </div>}
        </div>}
        <Btn onClick={()=>openEdit(ex.key)} variant="primary" size="sm" style={{width:"100%"}}><TrendingUp size={14}/> {pr?"Update PR":"Set First PR"}</Btn>
      </Card>})}
    </div>
  </div>;
};

// ═══ PROFILE SCREEN ═══
const ProfileScreen=({userProfile,setUserProfile,onLogout})=>{
  const[view,setView]=useState(null);
  const[ef,setEf]=useState(userProfile.fitnessLevel||"");
  const[eb,setEb]=useState(userProfile.bio||"");
  const[notifs,setNotifs]=useState({matches:true,bootcamps:true,group:true,trainer:true});
  const[supportMsg,setSupportMsg]=useState("");
  const[supportSent,setSupportSent]=useState(false);
  const[prefFL,setPrefFL]=useState(userProfile.prefFitnessLevels||[]);
  const[prefG,setPrefG]=useState(userProfile.prefGenders||[]);
  const[prefAMin,setPrefAMin]=useState(userProfile.prefAgeMin||"18");
  const[prefAMax,setPrefAMax]=useState(userProfile.prefAgeMax||"60");
  const[toast,setToast]=useState(null);
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),2500)};

  if(view==="editFitness")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Edit Fitness Level</h2><div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>{FITNESS_LEVELS.map(l=>{const s=ef===l,ic={Beginner:"🌱",Intermediate:"💪",Advanced:"🔥",Elite:"⚡"};return <Card key={l} onClick={()=>setEf(l)} style={{display:"flex",alignItems:"center",gap:16,padding:16,borderColor:s?T.primary:T.border}}><span style={{fontSize:26}}>{ic[l]}</span><p style={{flex:1,fontWeight:600,color:s?T.text:T.textMuted}}>{l}</p>{s&&<Check size={20} color={T.primary}/>}</Card>})}</div><Btn onClick={()=>{setUserProfile(x=>({...x,fitnessLevel:ef}));setView(null)}} size="lg" style={{width:"100%"}}>Save</Btn></div>;

  if(view==="editBio")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Edit Bio</h2><TextArea value={eb} onChange={e=>setEb(e.target.value)} placeholder="Tell others about yourself..." style={{minHeight:120,marginBottom:24}}/><Btn onClick={()=>{setUserProfile(x=>({...x,bio:eb}));setView(null)}} size="lg" style={{width:"100%"}}>Save</Btn></div>;

  if(view==="preferences")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Partner Preferences</h2>
    <div style={{marginBottom:22}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Preferred Fitness Level(s)</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{FITNESS_LEVELS.map(l=><Chip key={l} label={l} selected={prefFL.includes(l)} onClick={()=>setPrefFL(x=>x.includes(l)?x.filter(i=>i!==l):[...x,l])}/>)}</div><p style={{fontSize:11,color:T.textDim,marginTop:6}}>Leave empty = any</p></div>
    <div style={{marginBottom:22}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Preferred Gender(s)</label><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{GENDERS.slice(0,3).map(g=><Chip key={g} label={g} selected={prefG.includes(g)} onClick={()=>setPrefG(x=>x.includes(g)?x.filter(i=>i!==g):[...x,g])}/>)}</div><p style={{fontSize:11,color:T.textDim,marginTop:6}}>Leave empty = any</p></div>
    <div style={{marginBottom:28}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,display:"block"}}>Age Range</label><div style={{display:"flex",gap:12,alignItems:"center"}}><Input label="Min" type="number" value={prefAMin} onChange={e=>setPrefAMin(e.target.value)} containerStyle={{flex:1}}/><span style={{color:T.textDim,marginTop:20}}>—</span><Input label="Max" type="number" value={prefAMax} onChange={e=>setPrefAMax(e.target.value)} containerStyle={{flex:1}}/></div></div>
    <Btn onClick={()=>{setUserProfile(x=>({...x,prefFitnessLevels:prefFL,prefGenders:prefG,prefAgeMin:prefAMin,prefAgeMax:prefAMax}));setView(null)}} size="lg" style={{width:"100%"}}>Save Preferences</Btn>
  </div>;

  if(view==="notifications")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Notifications</h2>
    {userProfile.role==="trainer"?<>
    <Toggle on={notifs.ptEnquiries!==false} onToggle={()=>setNotifs(n=>({...n,ptEnquiries:!(n.ptEnquiries!==false)}))} label="Personal training enquiries"/>
    <Toggle on={notifs.bootcampJoins!==false} onToggle={()=>setNotifs(n=>({...n,bootcampJoins:!(n.bootcampJoins!==false)}))} label="Bootcamp join requests"/>
    <Toggle on={notifs.groupJoins!==false} onToggle={()=>setNotifs(n=>({...n,groupJoins:!(n.groupJoins!==false)}))} label="Group training join requests"/>
    <Toggle on={notifs.classCancellations!==false} onToggle={()=>setNotifs(n=>({...n,classCancellations:!(n.classCancellations!==false)}))} label="Class cancellations"/>
    <Toggle on={notifs.classUpdates!==false} onToggle={()=>setNotifs(n=>({...n,classUpdates:!(n.classUpdates!==false)}))} label="Class updates"/>
    <Toggle on={notifs.clientMessages!==false} onToggle={()=>setNotifs(n=>({...n,clientMessages:!(n.clientMessages!==false)}))} label="New messages from users"/>
    <Toggle on={notifs.payments!==false} onToggle={()=>setNotifs(n=>({...n,payments:!(n.payments!==false)}))} label="Subscription/payment updates"/>
    <Toggle on={notifs.trainerPromo!==false} onToggle={()=>setNotifs(n=>({...n,trainerPromo:!(n.trainerPromo!==false)}))} label="Trainer offers/promotions"/>
    </>:<>
    <Toggle on={notifs.matches} onToggle={()=>setNotifs(n=>({...n,matches:!n.matches}))} label="Match requests"/>
    <Toggle on={notifs.accepted!==false} onToggle={()=>setNotifs(n=>({...n,accepted:!(n.accepted!==false)}))} label="Accepted requests"/>
    <Toggle on={notifs.messages!==false} onToggle={()=>setNotifs(n=>({...n,messages:!(n.messages!==false)}))} label="Messages"/>
    <Toggle on={notifs.bootcamps} onToggle={()=>setNotifs(n=>({...n,bootcamps:!n.bootcamps}))} label="New bootcamps"/>
    <Toggle on={notifs.group} onToggle={()=>setNotifs(n=>({...n,group:!n.group}))} label="Group workouts"/>
    <Toggle on={notifs.trainer} onToggle={()=>setNotifs(n=>({...n,trainer:!n.trainer}))} label="Trainer offers"/>
    </>}
  </div>;

  if(view==="safety")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Safety Policy</h2><Card style={{padding:20,marginBottom:20}}><div style={{fontSize:13,color:T.textMuted,lineHeight:1.8}}>{["1. Respectful Behaviour — No harassment.","2. Meeting Safety — Gym only, staffed hours.","3. Mandatory Verification for all users.","4. Report issues — 24hr review.","5. Data Privacy — Encrypted, never shared.","6. Zero Tolerance for misuse."].map((t,i)=><p key={i} style={{marginBottom:8}}>{t}</p>)}</div></Card>
    <Card style={{padding:20,border:`1.5px solid ${T.primary}33`}}>
      <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,color:T.primaryLight}}>Full Safety & Responsibility Policy</h3>
      <div style={{fontSize:13,color:T.textMuted,lineHeight:1.9}}>
        <p style={{fontWeight:600,color:T.text,marginBottom:12}}>GymLink Safety & Responsibility Policy</p>
        <p style={{marginBottom:12}}>At GymLink, your safety is our priority. We are committed to creating a secure and respectful environment where users can find training partners and connect through fitness. To support this, we require identity verification through ID upload and selfie confirmation for all users.</p>
        <p style={{marginBottom:4,fontWeight:600,color:T.text}}>Meeting Guidelines</p>
        <p style={{marginBottom:12}}>We strongly advise all users to arrange meetings inside a gym or public fitness facility, avoid private or unfamiliar locations, meet during staffed gym hours where possible, and inform someone you trust about your plans if needed. GymLink is designed to facilitate connections within safe, public environments.</p>
        <p style={{marginBottom:4,fontWeight:600,color:T.text}}>Communication Outside the Platform</p>
        <p style={{marginBottom:12}}>While users may choose to exchange personal contact details such as phone numbers or social media, this is done entirely at their own discretion. GymLink does not monitor or control communication outside the app and is not responsible for any interactions, behaviour, or outcomes that occur outside the platform.</p>
        <p style={{marginBottom:4,fontWeight:600,color:T.text}}>User Responsibility</p>
        <p style={{marginBottom:12}}>By using GymLink, users agree to act respectfully and responsibly towards other users, use their own judgement when meeting others, and report suspicious, unsafe, or inappropriate behaviour through the app.</p>
        <p style={{marginBottom:4,fontWeight:600,color:T.text}}>Reporting & Support</p>
        <p style={{marginBottom:12}}>If a user experiences or witnesses concerning behaviour, they should report it through the app. All reports are flagged for review within 24 hours.</p>
        <p style={{marginBottom:4,fontWeight:600,color:T.text}}>Final Note</p>
        <p style={{marginBottom:0}}>GymLink provides tools to help people connect through fitness, but personal safety ultimately relies on individual awareness and responsibility. Train smart. Stay safe. Respect others.</p>
      </div>
    </Card>
  </div>;

  if(view==="account")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Account Settings</h2>
    <Card style={{padding:20,marginBottom:16}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:8}}>Privacy Controls</h3><p style={{fontSize:13,color:T.textMuted,lineHeight:1.6}}>Your data is encrypted and only shared with users you match with. You can control visibility in Partner Preferences.</p></Card>
    <Card style={{padding:20,marginBottom:16}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:8}}>Data Retention</h3><p style={{fontSize:13,color:T.textMuted,lineHeight:1.6}}>GymLink retains your profile data while your account is active. Chat history is stored for 90 days after last activity. All data is fully erasable upon account deletion.</p></Card>
    <Btn onClick={onLogout} variant="danger" size="lg" style={{width:"100%"}}><Trash2 size={16}/> Delete Account & All Data</Btn>
  </div>;

  if(view==="media")return <div className="fade-in" style={{padding:"16px 20px 100px"}}>
    {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:300,background:T.success,color:"#fff",padding:"12px 24px",borderRadius:T.radiusSm,fontSize:14,fontWeight:600,boxShadow:T.shadow,animation:"fadeIn .3s ease"}}><Check size={16} style={{marginRight:8,verticalAlign:"middle"}}/>{toast}</div>}
    <button onClick={()=>setView(null)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button>
    <h2 style={{fontSize:22,fontWeight:800,marginBottom:8}}>Manage Photos & Videos</h2>
    <p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>Showcase up to 9 photos and 3 short videos (max 45s each).</p>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{fontSize:15,fontWeight:700}}>Photos</h3><Badge color={T.accent}>{(userProfile.trainerPhotos||[]).length}/9</Badge></div>
      {(userProfile.trainerPhotos||[]).length===0?<Card style={{padding:24,textAlign:"center",borderStyle:"dashed"}}><Image size={32} color={T.textDim} style={{margin:"0 auto 8px"}}/><p style={{fontSize:13,color:T.textDim}}>No photos added yet</p></Card>:
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>{(userProfile.trainerPhotos||[]).map((p,i)=><div key={p.id||i} style={{aspectRatio:"1",background:T.bgInput,borderRadius:T.radiusSm,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",border:`1px solid ${T.border}`}}>
        <Image size={20} color={T.textDim}/>
        <button onClick={()=>setUserProfile(x=>({...x,trainerPhotos:(x.trainerPhotos||[]).filter((_,j)=>j!==i)}))} style={{position:"absolute",top:4,right:4,background:T.danger,border:"none",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={10} color="#fff"/></button>
      </div>)}</div>}
      <Btn onClick={()=>{if((userProfile.trainerPhotos||[]).length>=9){showToast("You can upload up to 9 photos");return}setUserProfile(x=>({...x,trainerPhotos:[...(x.trainerPhotos||[]),{id:"ph-"+Date.now(),uploadedAt:new Date().toISOString()}]}));showToast("Photo added")}} variant="secondary" size="sm" style={{marginTop:12,width:"100%"}} disabled={(userProfile.trainerPhotos||[]).length>=9}><Upload size={14}/> Add Photo</Btn>
    </div>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{fontSize:15,fontWeight:700}}>Videos</h3><Badge color={T.accent}>{(userProfile.trainerVideos||[]).length}/3</Badge></div>
      {(userProfile.trainerVideos||[]).length===0?<Card style={{padding:24,textAlign:"center",borderStyle:"dashed"}}><Play size={32} color={T.textDim} style={{margin:"0 auto 8px"}}/><p style={{fontSize:13,color:T.textDim}}>No videos added yet</p></Card>:
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{(userProfile.trainerVideos||[]).map((v,i)=><Card key={v.id||i} style={{padding:14,display:"flex",alignItems:"center",gap:12}}>
        <Play size={20} color={T.accent}/><p style={{flex:1,fontSize:13}}>Video {i+1} <span style={{color:T.textDim,fontSize:11}}>· max 45s</span></p>
        <Btn onClick={()=>setUserProfile(x=>({...x,trainerVideos:(x.trainerVideos||[]).filter((_,j)=>j!==i)}))} variant="ghost" size="sm"><X size={14}/></Btn>
      </Card>)}</div>}
      <Btn onClick={()=>{if((userProfile.trainerVideos||[]).length>=3){showToast("You can upload up to 3 videos");return}setUserProfile(x=>({...x,trainerVideos:[...(x.trainerVideos||[]),{id:"vd-"+Date.now(),duration:30,uploadedAt:new Date().toISOString()}]}));showToast("Video added (max 45s)")}} variant="secondary" size="sm" style={{marginTop:12,width:"100%"}} disabled={(userProfile.trainerVideos||[]).length>=3}><Upload size={14}/> Add Video (max 45s)</Btn>
    </div>
    <p style={{fontSize:11,color:T.textDim,textAlign:"center"}}>Photos and videos are visible on your trainer profile to gym members.</p>
  </div>;

  if(view==="support")return <div className="fade-in" style={{padding:"16px 20px 100px"}}><button onClick={()=>{setView(null);setSupportSent(false);setSupportMsg("")}} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,marginBottom:20}}><ChevronLeft size={16}/> Back</button><h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Help & Support</h2>
    {supportSent?<div style={{textAlign:"center",padding:40}}><Check size={48} color={T.success} style={{marginBottom:12}}/><h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>Message Sent!</h3><p style={{color:T.textMuted}}>We'll get back to you within 48 hours.</p></div>:<>
    <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
      {[{icon:Flag,label:"Report a Bug",desc:"Found something broken?"},{icon:ThumbsUp,label:"Send Feedback",desc:"Tell us what's working"},{icon:HelpCircle,label:"Suggest Improvement",desc:"Ideas to make GymLink better"}].map(item=><Card key={item.label} onClick={()=>setSupportMsg(item.label+": ")} style={{display:"flex",alignItems:"center",gap:14,padding:16,borderColor:supportMsg.startsWith(item.label)?T.primary:T.border}}><item.icon size={20} color={T.primaryLight}/><div><p style={{fontWeight:600,fontSize:14}}>{item.label}</p><p style={{fontSize:12,color:T.textDim}}>{item.desc}</p></div></Card>)}
    </div>
    <TextArea label="Your message" value={supportMsg} onChange={e=>setSupportMsg(e.target.value)} placeholder="Describe your issue, feedback, or suggestion..." style={{minHeight:100,marginBottom:16}}/>
    <Btn onClick={()=>setSupportSent(true)} size="lg" style={{width:"100%"}} disabled={!supportMsg.trim()}><Send size={16}/> Submit</Btn></>}
  </div>;

  return <div className="fade-in" style={{padding:"16px 20px 100px"}}><div style={{marginBottom:28}}><h1 style={{fontSize:26,fontWeight:800}}>Profile</h1></div>
    <Card style={{padding:24,marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}><Avatar name={userProfile.name} size={64} verified={true}/><div><h2 style={{fontSize:20,fontWeight:700}}>{userProfile.name}</h2><p style={{fontSize:13,color:T.textMuted,marginTop:2}}>{userProfile.age}y · {userProfile.gender} · {userProfile.fitnessLevel}</p><div style={{marginTop:6}}><Badge color={T.accent} glow>Verified ✓</Badge></div></div></div>
      {userProfile.bio&&<p style={{fontSize:14,color:T.textMuted,lineHeight:1.6}}>{userProfile.bio}</p>}
    </Card>
    {userProfile.role==="trainer"&&<Card style={{padding:20,marginBottom:20}}>
      <h3 style={{fontSize:15,fontWeight:700,marginBottom:12}}>Media Showcase</h3>
      {((userProfile.trainerPhotos||[]).length>0||(userProfile.trainerVideos||[]).length>0)?<>
        {(userProfile.trainerPhotos||[]).length>0&&<div style={{marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8}}>Photos ({(userProfile.trainerPhotos||[]).length}/9)</p><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{(userProfile.trainerPhotos||[]).map((p,i)=><div key={p.id||i} style={{aspectRatio:"1",background:T.bgInput,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${T.border}`}}><Image size={16} color={T.textDim}/></div>)}</div></div>}
        {(userProfile.trainerVideos||[]).length>0&&<div><p style={{fontSize:12,fontWeight:600,color:T.textDim,marginBottom:8}}>Videos ({(userProfile.trainerVideos||[]).length}/3, max 45s)</p><div style={{display:"flex",gap:8}}>{(userProfile.trainerVideos||[]).map((v,i)=><div key={v.id||i} style={{width:80,height:60,background:T.bgInput,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${T.border}`}}><Play size={16} color={T.accent}/></div>)}</div></div>}
      </>:<p style={{fontSize:12,color:T.textDim}}>No photos or videos added yet.</p>}
    </Card>}
    <h3 style={{fontSize:15,fontWeight:700,marginBottom:12,color:T.textMuted}}>Settings</h3>
    <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:20}}>
      {(userProfile.role==="trainer"?[{icon:Edit,label:"Edit Bio",action:()=>setView("editBio")},{icon:Image,label:"Manage Photos & Videos",action:()=>setView("media")},{icon:Bell,label:"Notifications",action:()=>setView("notifications")},{icon:Shield,label:"Safety Policy",action:()=>setView("safety")},{icon:Settings,label:"Account Settings",action:()=>setView("account")},{icon:HelpCircle,label:"Help & Support",action:()=>setView("support")}]:[{icon:Activity,label:"Edit Fitness Level",action:()=>setView("editFitness")},{icon:Edit,label:"Edit Bio",action:()=>setView("editBio")},{icon:Filter,label:"Partner Preferences",action:()=>setView("preferences")},{icon:Bell,label:"Notifications",action:()=>setView("notifications")},{icon:Shield,label:"Safety Policy",action:()=>setView("safety")},{icon:Settings,label:"Account Settings",action:()=>setView("account")},{icon:HelpCircle,label:"Help & Support",action:()=>setView("support")}]).map(item=><button key={item.label} onClick={item.action} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 4px",background:"none",border:"none",borderBottom:`1px solid ${T.border}15`,cursor:item.action?"pointer":"default",width:"100%",textAlign:"left"}}><item.icon size={18} color={T.textMuted}/><span style={{fontSize:14,color:T.text,flex:1}}>{item.label}</span><ChevronRight size={16} color={T.textDim}/></button>)}
    </div>
    <Btn onClick={onLogout} variant="ghost" size="sm" style={{width:"100%",color:T.danger}}><LogOut size={16}/> Sign Out</Btn>
  </div>;
};

// ═══ BOTTOM NAV ═══
const BottomNav=({active,onChange,role,requestCount})=>{
  const mT=[{key:"discover",icon:Search,label:"Discover"},{key:"matches",icon:Heart,label:"Matches"},{key:"trainers",icon:Award,label:"Trainers"},{key:"requests",icon:MessageCircle,label:"Requests"},{key:"profile",icon:User,label:"Profile"}];
  const tT=[{key:"dashboard",icon:BarChart2,label:"Dashboard"},{key:"trainers",icon:Award,label:"Services"},{key:"requests",icon:MessageCircle,label:"Requests"},{key:"profile",icon:User,label:"Profile"}];
  const tabs=role==="trainer"?tT:mT;
  return <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.bgCard+"F0",borderTop:`1px solid ${T.border}`,backdropFilter:"blur(16px)",display:"flex",justifyContent:"space-around",padding:"8px 0 env(safe-area-inset-bottom,8px)",zIndex:100}}>
    {tabs.map(tab=>{const I=tab.icon;const a=active===tab.key;const showDot=tab.key==="requests"&&requestCount>0;
    return <button key={tab.key} onClick={()=>onChange(tab.key)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"6px 12px",flex:1,position:"relative"}}>
      <I size={20} color={a?T.primary:T.textDim}/>
      <span style={{fontSize:10,fontWeight:600,color:a?T.primary:T.textDim}}>{tab.label}</span>
      {showDot&&<div style={{position:"absolute",top:2,right:"50%",marginRight:-14,width:8,height:8,borderRadius:4,background:T.danger}}/>}
    </button>})}
  </div>;
};

// ═══ ROOT APP ═══
export default function GymLink(){
  const[screen,setScreen]=useState("onboarding");
  const[activeTab,setActiveTab]=useState("discover");
  const[userProfile,setUserProfile]=useState({});
  // Request system state — each record includes session context
  const[sentRequests,setSentRequests]=useState([]);
  const[incomingRequests,setIncomingRequests]=useState(()=>[
    {...MOCK_USERS[1],sessionKey:"demo-1",sessionType:"today",date:new Date().toISOString().slice(0,10),time:"18:00",gymId:"g1"},
    {...MOCK_USERS[3],sessionKey:"demo-2",sessionType:"today",date:new Date().toISOString().slice(0,10),time:"16:30",gymId:"g1"},
  ]);
  const[confirmedMatches,setConfirmedMatches]=useState([]);
  // Long-term partner state — lifted to root for persistence across tab switches
  const[ltSentRequests,setLtSentRequests]=useState([]);
  const[ltConfirmedMatches,setLtConfirmedMatches]=useState([]);
  // Trainer booking state — lifted to root for persistence
  const[trainerReqs,setTrainerReqs]=useState(()=>{try{const s=window._glTrainerReqs;return s||MOCK_TRAINER_REQUESTS}catch(e){return MOCK_TRAINER_REQUESTS}});
  const[acceptedBookings,setAcceptedBookings]=useState(()=>{try{return window._glAccepted||[]}catch(e){return[]}});
  // Trainer's posted services — lifted to root
  const[trainerBootcamps,setTrainerBootcamps]=useState(()=>MOCK_BOOTCAMPS.filter(b=>b.trainerId===(null||"t1")));
  const[trainerGroups,setTrainerGroups]=useState(()=>MOCK_GROUP.filter(g=>g.trainerId===(null||"t1")));
  // Persist trainer state to window for tab-switch survival
  useEffect(()=>{window._glTrainerReqs=trainerReqs;window._glAccepted=acceptedBookings},[trainerReqs,acceptedBookings]);

  useEffect(()=>{injectGlobalStyles()},[]);

  const handleOnboardingComplete=(profile)=>{setUserProfile(profile);setScreen("app");setActiveTab(profile.role==="trainer"?"dashboard":"discover")};
  const handleLogout=()=>{setScreen("onboarding");setActiveTab("discover");setUserProfile({});setSentRequests([]);setIncomingRequests([]);setConfirmedMatches([]);setLtSentRequests([]);setLtConfirmedMatches([]);setTrainerReqs(MOCK_TRAINER_REQUESTS);setAcceptedBookings([]);setTrainerBootcamps(MOCK_BOOTCAMPS.filter(b=>b.trainerId==="t1"));setTrainerGroups(MOCK_GROUP.filter(g=>g.trainerId==="t1"));window._glTrainerReqs=null;window._glAccepted=null};

  // MVP/Testing: GymLink requests auto-confirm with session context + overlap check
  const handleSendRequest=(user,sessionCtx)=>{
    const key=`${user.id}-${sessionCtx.sessionType}-${sessionCtx.date}-${sessionCtx.time}-${sessionCtx.gymId}`;
    if(sentRequests.find(r=>r.sessionKey===key))return;
    const overlap=hasBookingOverlap(sessionCtx.date,sessionCtx.time,sessionCtx.duration||60,[...confirmedMatches,...ltConfirmedMatches,...acceptedBookings]);
    if(overlap){alert(`You already have a booking at this time${overlap.name?` with ${overlap.name}`:""}.`);return}
    const record={...user,sessionKey:key,...sessionCtx};
    setSentRequests(r=>[...r,record]);
    setConfirmedMatches(m=>[...m,record]);
  };
  const[chatUser,setChatUser]=useState(null);
  // Accept incoming → confirmed match, auto-navigate to chat
  const handleAccept=(sessionKey)=>{const u=incomingRequests.find(r=>r.sessionKey===sessionKey);if(u){setConfirmedMatches(m=>[...m,u]);setIncomingRequests(r=>r.filter(x=>x.sessionKey!==sessionKey));setChatUser(u);setActiveTab("matches")}};
  const handleDecline=(sessionKey)=>{setIncomingRequests(r=>r.filter(x=>x.sessionKey!==sessionKey))};

  if(screen==="onboarding")return <OnboardingFlow onComplete={handleOnboardingComplete}/>;

  const renderScreen=()=>{
    const ltProps={ltSentRequests,setLtSentRequests,ltConfirmedMatches,setLtConfirmedMatches};
    const trainerProps={trainerReqs,setTrainerReqs,acceptedBookings,setAcceptedBookings,trainerBootcamps,setTrainerBootcamps,trainerGroups,setTrainerGroups};
    // TRAINER: no discover/matches — those are member-only
    if(userProfile.role==="trainer"){switch(activeTab){
      case"dashboard":return <TrainerDashboard userProfile={userProfile} {...trainerProps}/>;
      case"trainers":return <TrainerServicesScreen userProfile={userProfile} {...trainerProps}/>;
      case"requests":return <RequestsScreen incomingRequests={[]} sentRequests={[]} onAccept={()=>{}} onDecline={()=>{}} role="trainer" {...trainerProps}/>;
      case"profile":return <ProfileScreen userProfile={userProfile} setUserProfile={setUserProfile} onLogout={handleLogout}/>;
      default:return <TrainerDashboard userProfile={userProfile} {...trainerProps}/>;
    }}
    // MEMBER: full gym buddy flow
    switch(activeTab){
      case"discover":return <DiscoverScreen userProfile={userProfile} sentRequests={sentRequests} onSendRequest={handleSendRequest} confirmedMatches={confirmedMatches} {...ltProps}/>;
      case"matches":return <MatchesScreen confirmedMatches={confirmedMatches} ltConfirmedMatches={ltConfirmedMatches} initialChat={chatUser} onChatOpened={()=>setChatUser(null)}/>;
      case"trainers":return <TrainersScreen userProfile={userProfile}/>;
      case"requests":return <RequestsScreen incomingRequests={incomingRequests} sentRequests={sentRequests} onAccept={handleAccept} onDecline={handleDecline} role="member"/>;
      case"profile":return <ProfileScreen userProfile={userProfile} setUserProfile={setUserProfile} onLogout={handleLogout}/>;
      default:return <DiscoverScreen userProfile={userProfile} sentRequests={sentRequests} onSendRequest={handleSendRequest} confirmedMatches={confirmedMatches} {...ltProps}/>;
    }
  };

  return <div style={{minHeight:"100vh",background:T.bg}}>{renderScreen()}<BottomNav active={activeTab} onChange={setActiveTab} role={userProfile.role} requestCount={userProfile.role==="trainer"?trainerReqs.length:incomingRequests.length}/></div>;
}
