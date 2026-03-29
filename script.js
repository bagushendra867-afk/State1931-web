/* ==========================================
   1. MAP & FORTRESSES DATA (REAL-TIME)
========================================== */
window.renderMap = function(list, containerId, prefix, type) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = "";
    
    // Looping data dari Firebase untuk membuat kotak benteng
    list.forEach((tag, index) => {
        let cssClass = "ally"; 
        let textTag = tag ? tag.toUpperCase() : "[???]"; 
        
        if (textTag.includes("KPK")) { cssClass = "grd"; }
        else if (textTag.includes("VLN")) { cssClass = "vln"; }
        else if (textTag.includes("BEE")) { cssClass = "bee"; }
        else if (textTag.includes("TUR")) { cssClass = "tur"; }
        else if (textTag.includes("WBE")) { cssClass = "wbe"; }
        else if (textTag.includes("HEL")) { cssClass = "hel"; }
        
        // Menambahkan fungsi klik (onclick) untuk edit
        container.innerHTML += `
        <div class="fort ${cssClass}" style="cursor:pointer;" onclick="editMapItem('${type}', ${index}, '${textTag}')" title="Klik untuk Edit">
            <span class="f-name">${prefix}-${index + 1}</span>
            <span class="f-owner">${textTag}</span>
        </div>`;
    });
}
// Catatan: Tidak ada lagi event "load" di sini karena sekarang dipanggil otomatis oleh Firebase

/* ==========================================
   2. I18N SYSTEM (MULTI-BAHASA)
========================================== */
window.currentLang = 'en';
window.i18n = {
  en: { 
    subtitle: "Whiteout Survival — info & schedule (UTC)", nextLabel: "Next event", majorAlliance: "Major Alliance", napCaption: "NAP based on SVS Prep Contribution. Shared castle/forts + 20% fortress buff rewards.", joinDiscord: "💬 Join Discord", registerSVS: "📋 Register SVS", shortInstructions: "Short Instructions", instUtc: "All times <strong>UTC</strong>.", instBT: "🐻 = Bear Trap (BT)", instCJ: "🤠 = Crazy Joe (CJ)", instDiscord: "Use Discord for SVS coordination", scheduleTitle: "Schedule Event (UTC)", rolePrimary: "— primary", roleSupport: "— support", roleFrontline: "— frontline", roleNight: "— night ops", roleWbe: "— tactical", roleHel: "— academy", evBearTrap: "🐻 Bear Trap", evFoundry: "🏭 Foundry", evCanyon: "🏞️ Canyon", evCrazyJoe: "🤠 Crazy Joe", accordionHint: "Click on the alliance name to expand/collapse details. All times are <strong>UTC</strong>.", calcTitle: "🧮 Points Calculator SVS", calcDesc: "If you want to calculate how many points you can collect from the materials you have saved, please visit this website:", calcBtn: "🖱️Visit Calculator SVS", serverAgeLabel: "Server Age", daysLabel: "days", stratTitle: "📚 Strategy Guide", btTitle: "🐻 Bear Trap", btLeaderTitle: "👑 Calling Rallies", btLeaderDesc: "Top 3 strongest heroes.", btJoinerTitle: "🛡️ Joining Rallies", btJoinerReq: "Heroes must be at least:", btJoinerEmpty: "Send NO HEROES if out of list.", btJoinerPresave: "Use presave buttons.", cjTitle: "🤠 Crazy Joe", cjPrepTitle: "🛠️ Preparation", cjPrep1: "Coordination: Discuss targets.", cjPrep2: "Clear City: Reinforce allies (Zero Defense).", cjPrep3: "Buffs: Use Damage/Defense buffs.", cjActionTitle: "⚔️ During Event", cjAction1: "Troop Swap: Reinforce online allies.", cjAction2: "Infantry & Lancers give max points.", cjAction3: "HQ Def: Strongest heroes home for Wave 10 & 20.", cjDontTitle: "🚫 Key \"Don'ts\"", cjDont1: "Don't Heal Troops (steals points).", cjDont2: "Don't Keep Troops Home (early on).", svsTitle: "⚔️ SVS Strategy", svsPrepTitle: "🛠️ Prep Phase (Days 1-5)", svsSave: "⚠️ SAVE everything (speedups/resources) for this week!", svsD1: "Construction, Research, Fire Crystals.", svsD2: "Train Troops, Chief Gear/Charms.", svsD3: "Beasts, Polar Terrors (30k pts).", svsD4: "Train Troops, Use Intel.", svsD5: "All-Out! Use remaining speedups/shards.", svsBuffTip: "💡 Tip: Use Buffs before using speedups.", svsBattleTitle: "🛡️ Battle Phase", svsShield: "Shield Up: Protect resources & troops.", svsRally: "Rally vs Solo: Don't attack alone.", svsOrders: "Follow Orders: Listen to leadership.", fnfTitle: "🔥 Flame and Fangs", fnfDesc: "Prepare for Monday to get max loot.", fnfStep1: "<strong>Sun 08:00-15:59 UTC:</strong> Do intels but DON'T claim.", fnfStep2: "<strong>Sun 16:00 - Mon 00:00 UTC:</strong> Don't touch intels.", fnfStep3: "<strong>Mon 00:00-07:59 UTC:</strong> Claim & complete all intels.", giftTitle: "A Gift of Memories", giftBody: "\"Thank you for being part of State 1931 history.<br>This website is a small gift from me, so we never forget<br>that even in the coldest snowstorm,<br>we built an incredible warmth together.\"", giftSign: "— UNTIL WE MEET AGAIN, COMRADES —", hofTitle: "🏆 Hall of Fame", hofDesc: "Top players this week", fcTitle: "🔥 FC Estimator", fcDesc: "Calculate Fire Crystals needed (Full Buildings).", cgTitle: "🛡️ Chief Gear Calculator", cgDesc: "Calculate Alloy, Polish, Plans & Amber.", charmTitle: "🧿 Chief Charm Calculator", charmDesc: "Calculate Guides, Designs & Secrets.", mapTitle: "🤝 Territory Map", navHome: "Home", navWiki: "Wiki", navTools: "Tools", navHof: "Fame", wowTitle: "✉️ Wall of Wishes", wowName: "Name / Nickname (e.g. Mr.jhon)", wowAlliance: "-- Select Alliance --", wowMsg: "Write your message here...", wowSend: "Send Message 🚀", wowLoading: "Loading message...", wowEmpty: "No messages yet. Be the first to write!", wowAlertInc: "Please fill in Name, Alliance, and Message!", wowAlertOk: "Message sent! 🚀", wowAlertFail: "Failed to send. Check connection."
  },
  id: { 
    subtitle: "Whiteout Survival — info & jadwal (UTC)", nextLabel: "Event berikutnya", majorAlliance: "Aliansi Utama", napCaption: "NAP berdasarkan kontribusi persiapan SVS. Kastil/fort berbagi + hadiah buff benteng 20%.", joinDiscord: "💬 Gabung Discord", registerSVS: "📋 Daftar SVS", shortInstructions: "Instruksi Singkat", instUtc: "Semua waktu <strong>UTC</strong>.", instBT: "🐻 = Bear Trap (BT)", instCJ: "🤠 = Crazy Joe (CJ)", instDiscord: "Gunakan Discord untuk koordinasi SVS", scheduleTitle: "Jadwal Event (UTC)", rolePrimary: "— utama", roleSupport: "— dukungan", roleFrontline: "— garis depan", roleNight: "— operasi malam", roleWbe: "— taktis", roleHel: "— akademi", evBearTrap: "🐻 Bear Trap", evFoundry: "🏭 Foundry", evCanyon: "🏞️ Canyon", evCrazyJoe: "🤠 Crazy Joe", accordionHint: "Klik nama aliansi untuk expand/collapse detail. Semua waktu dalam <strong>UTC</strong>.", calcTitle: "🧮 Kalkulator Poin SVS", calcDesc: "Kalau mau hitung poin dari material yang sudah disimpan, kunjungi situs ini:", calcBtn: "🖱️Kunjungi Kalkulator SVS", serverAgeLabel: "Umur Server", daysLabel: "hari", stratTitle: "📚 Panduan Strategi", btTitle: "🐻 Bear Trap", btLeaderTitle: "👑 Memimpin Rally", btLeaderDesc: "Gunakan 3 Hero terkuat.", btJoinerTitle: "🛡️ Bergabung Rally", btJoinerReq: "Hero wajib minimal:", btJoinerEmpty: "Kirim TANPA HERO jika list habis.", btJoinerPresave: "Gunakan tombol presave.", cjTitle: "🤠 Crazy Joe", cjPrepTitle: "🛠️ Persiapan", cjPrep1: "Koordinasi: Bahas target.", cjPrep2: "Kosongkan Kota: Reinforce teman (Zero Defense).", cjPrep3: "Buff: Gunakan buff Damage/Defense.", cjActionTitle: "⚔️ Selama Event", cjAction1: "Tukar Pasukan: Reinforce teman yg online.", cjAction2: "Gunakan Infanteri & Lancer (poin maks).", cjAction3: "Def HQ: Hero terkuat di rumah utk Wave 10 & 20.", cjDontTitle: "🚫 Jangan Lakukan", cjDont1: "JANGAN Heal Pasukan (mencuri poin).", cjDont2: "JANGAN Simpan Pasukan di rumah (awal).", svsTitle: "⚔️ Strategi SVS", svsPrepTitle: "🛠️ Fase Persiapan (Hari 1-5)", svsSave: "⚠️ SIMPAN semuanya (speedup/SDA) utk minggu ini!", svsD1: "Konstruksi, Riset, Fire Crystal.", svsD2: "Latih Pasukan, Chief Gear/Charms.", svsD3: "Beast, Polar Terror (30k poin).", svsD4: "Latih Pasukan, Pakai Intel.", svsD5: "Habis-habisan! Pakai sisa speedup/shards.", svsBuffTip: "💡 Tip: Aktifkan Buff sebelum pakai speedup.", svsBattleTitle: "🛡️ Fase Pertempuran", svsShield: "Pasang Shield: Lindungi SDA & pasukan.", svsRally: "Rally vs Solo: Jangan serang sendiri.", svsOrders: "Ikuti Perintah: Dengar arahan R4/R5.", fnfTitle: "🔥 Flame and Fangs", fnfDesc: "Persiapan hari Senin untuk jarahan maksimal.", fnfStep1: "<strong>Minggu 08:00-15:59 UTC:</strong> Kerjakan intel tapi JANGAN klaim.", fnfStep2: "<strong>Minggu 16:00 - Senin 00:00 UTC:</strong> Jangan sentuh intel.", fnfStep3: "<strong>Senin 00:00-07:59 UTC:</strong> Klaim & selesaikan semua intel.", giftTitle: "Kado Kenangan", giftBody: "\"Terima kasih telah menjadi bagian dari sejarah State 1931.<br>Website ini adalah kado kecil dariku, agar kita tidak lupa<br>bahwa di tengah badai salju yang paling dingin sekalipun,<br>kita pernah membangun kehangatan yang luar biasa bersama-sama.\"", giftSign: "— SAMPAI JUMPA LAGI, KAWAN —", hofTitle: "🏆 Hall of Fame", hofDesc: "Top player minggu ini", fcTitle: "🔥 Estimasi FC", fcDesc: "Hitung kebutuhan Fire Crystal (Full).", cgTitle: "🛡️ Kalkulator Chief Gear", cgDesc: "Hitung Alloy, Polish, Plans & Amber.", charmTitle: "🧿 Kalkulator Chief Charm", charmDesc: "Hitung Guides, Designs & Secrets.", mapTitle: "🤝 Peta Wilayah", navHome: "Home", navWiki: "Wiki", navTools: "Alat", navHof: "Fame", wowTitle: "✉️ Papan Harapan", wowName: "Nama / Nickname (cth. Mr.jhon)", wowAlliance: "-- Pilih Aliansi --", wowMsg: "Tulis pesanmu di sini...", wowSend: "Kirim Pesan 🚀", wowLoading: "Memuat pesan...", wowEmpty: "Belum ada pesan. Jadilah yang pertama!", wowAlertInc: "Mohon lengkapi Nama, Aliansi, dan Pesan!", wowAlertOk: "Pesan terkirim! 🚀", wowAlertFail: "Gagal mengirim. Periksa koneksi."
  },
  ko: { 
    subtitle: "화이트아웃 서바이벌 — 정보 & 일정 (UTC)", nextLabel: "다음 이벤트", majorAlliance: "주요 동맹", napCaption: "SVS 준비 기여도 기준 NAP. 성/요새 공유 + 요새 버프 보상 20%.", joinDiscord: "💬 디스코드 참여", registerSVS: "📋 SVS 등록", shortInstructions: "간단한 지침", instUtc: "모든 시간은 <strong>UTC</strong> 기준입니다.", instBT: "🐻 = 베어 트랩 (BT)", instCJ: "🤠 = 크레이지 조 (CJ)", instDiscord: "SVS 조율은 디스코드를 사용하세요", scheduleTitle: "이벤트 일정 (UTC)", rolePrimary: "— 주력", roleSupport: "— 지원", roleFrontline: "— 전선", roleNight: "— 야간 작전", roleWbe: "— 전술", roleHel: "— 아카데미", evBearTrap: "🐻 베어 트랩", evFoundry: "🏭 주조소", evCanyon: "🏞️ 협곡", evCrazyJoe: "🤠 크레이지 조", accordionHint: "동맹 이름을 클릭하여 자세히 보기/접기. 모든 시간은 <strong>UTC</strong>입니다.", calcTitle: "🧮 SVS 포인트 계산기", calcDesc: "저장해둔 재료로 얻을 포인트를 계산하려면 아래 웹사이트를 방문하세요:", calcBtn: "🖱️ SVS 계산기 방문", serverAgeLabel: "서버 오픈", daysLabel: "일째", stratTitle: "📚 전략 가이드", btTitle: "🐻 베어 트랩", btLeaderTitle: "👑 집결 열기", btLeaderDesc: "상위 3명 강력한 영웅 사용.", btJoinerTitle: "🛡️ 집결 참여", btJoinerReq: "영웅 최소 조건:", btJoinerEmpty: "영웅이 없다면 없이 보내세요.", btJoinerPresave: "프리셋 버튼 사용.", cjTitle: "🤠 크레이지 조", cjPrepTitle: "🛠️ 준비", cjPrep1: "조율: 병력 중복 방지.", cjPrep2: "도시 비우기: 맹원 지원 (무방비 전략).", cjPrep3: "버프: 공격/방어 버프 사용.", cjActionTitle: "⚔️ 이벤트 진행", cjAction1: "병력 교환: 접속 맹원 지원.", cjAction2: "보병 & 창병 사용 (점수 최대화).", cjAction3: "본부 방어: 웨이브 10 & 20엔 최강 영웅 배치.", cjDontTitle: "🚫 금지 사항", cjDont1: "치료 금지 (점수 뺏김).", cjDont2: "초반 병력 본부 대기 금지.", svsTitle: "⚔️ SVS 전략", svsPrepTitle: "🛠️ 준비 단계 (1-5일차)", svsSave: "⚠️ 모든 자원/가속을 이번 주를 위해 아끼세요!", svsD1: "건설, 연구, 불의 수정(FC).", svsD2: "병력 훈련, 영주 장비/부적.", svsD3: "야수, 폴라 테러 (3만 점).", svsD4: "병력 훈련, 첩보 사용.", svsD5: "전력 질주! 남은 가속/조각 사용.", svsBuffTip: "💡 팁: 가속 사용 전 버프 활성화.", svsBattleTitle: "🛡️ 전투 단계", svsShield: "보호막 유지: 자원 및 병력 보호.", svsRally: "집결 공격: 단독 공격 금지.", svsOrders: "지휘 따르기: 목표 설정 확인.", fnfTitle: "🔥 화염과 송곳니", fnfDesc: "월요일 최대 보상을 위한 준비.", fnfStep1: "<strong>일 08:00-15:59 UTC:</strong> 정보 임무 수행하되 수령 금지.", fnfStep2: "<strong>일 16:00 - 월 00:00 UTC:</strong> 정보 임무 건드리지 마세요.", fnfStep3: "<strong>월 00:00-07:59 UTC:</strong> 모든 정보 임무 수령 및 완료.", giftTitle: "추억의 선물", giftBody: "\"State 1931의 역사가 되어주셔서 감사합니다.<br>이 웹사이트는 제 작은 선물입니다.<br>가장 추운 눈보라 속에서도 우리가 함께 만들어낸<br>따뜻한 우정을 영원히 잊지 않기를 바랍니다.\"", giftSign: "— 다시 만날 때까지, 전우들이여 —", hofTitle: "🏆 명예의 전당", hofDesc: "이번 주 상위 플레이어", fcTitle: "🔥 FC 계산기", fcDesc: "불의 수정 필요량 계산 (전체 건물).", cgTitle: "🛡️ 영주 장비 계산기", cgDesc: "합금, 광택제, 도면 & 호박석 계산.", charmTitle: "🧿 영주 부적 계산기", charmDesc: "가이드, 도안 & 비급 계산.", mapTitle: "🤝 영토 지도", navHome: "홈", navWiki: "위키", navTools: "도구", navHof: "명예", wowTitle: "✉️ 소망의 벽", wowName: "이름 / 닉네임 (예: Mr.jhon)", wowAlliance: "-- 동맹 선택 --", wowMsg: "여기에 메시지를 작성하세요...", wowSend: "메시지 보내기 🚀", wowLoading: "메시지 불러오는 중...", wowEmpty: "아직 메시지가 없습니다. 첫 번째로 작성해 보세요!", wowAlertInc: "이름, 동맹, 메시지를 모두 입력해주세요!", wowAlertOk: "메시지가 전송되었습니다! 🚀", wowAlertFail: "전송 실패. 연결을 확인하세요."
  }
};

function applyTranslations(lang){
  const dict = window.i18n[lang] || window.i18n.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const key=el.getAttribute('data-i18n'); if(dict[key]) el.innerText=dict[key]; });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{ const key=el.getAttribute('data-i18n-html'); if(dict[key]) el.innerHTML=dict[key]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ const key=el.getAttribute('data-i18n-placeholder'); if(dict[key]) el.placeholder=dict[key]; });
  document.documentElement.setAttribute('lang', lang);
}

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-lang]').forEach(btn=>{ btn.addEventListener('click', ()=>{ window.currentLang=btn.getAttribute('data-lang'); applyTranslations(window.currentLang); updateCountdown(); }); });
  applyTranslations(window.currentLang);
});

function tEventName(enName){ const keyMap={"Bear Trap":"evBearTrap","Foundry":"evFoundry","Canyon":"evCanyon","Crazy Joe":"evCrazyJoe"}; const key=keyMap[enName]; if(!key)return enName; const dict=window.i18n[window.currentLang]||window.i18n.en; return (dict[key]||enName).replace(/^([\u2600-\u27BF]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u,'').trim()||enName; }
/* ==========================================
   3. VISUAL EFFECTS, TABS, & ACCORDION SHORTCUT
========================================== */
(() => { const canvas=document.getElementById('snow-canvas'); const ctx=canvas.getContext('2d'); let w=canvas.width=innerWidth,h=canvas.height=innerHeight; const flakes=[]; const num=Math.floor((w*h)/50000); for(let i=0;i<num;i++){ flakes.push({x:Math.random()*w, y:Math.random()*h, r:(Math.random()*2.5)+0.8, d:Math.random()*1.5, s:(Math.random()*0.6)+0.2}); } addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight;}); function draw(){ ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(255,255,255,0.85)'; flakes.forEach((f,i)=>{ ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); f.y+=f.s+Math.sin(f.d+i)*0.3; f.x+=Math.cos(f.d+i)*0.2; if(f.y>h+10) f.y=-5,f.x=Math.random()*w; if(f.x>w+10) f.x=-5; if(f.x<-10) f.x=w+5; }); requestAnimationFrame(draw); } draw(); })();

function updateLocalTime() {
    const now = new Date();
    document.getElementById('local-time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateLocalTime, 1000); updateLocalTime();

window.switchTab = function(tabId, element) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // FITUR AUTO-LOCK: Matikan Admin Mode setiap pindah Tab
    if (window.isAdminMode) {
        window.isAdminMode = false;
        // Munculkan kembali tombol waktu lokal jika ada
        if(document.getElementById('local-time-toggle')) {
            document.getElementById('local-time-toggle').style.display = 'block';
        }
        // Refresh tampilan HOF agar tombol "Tambah" hilang
        if(window.renderHof) window.renderHof();
        
        console.log("Admin Mode Auto-Locked due to tab switch. 🔒");
    }
}

// BUNGKUS LOGIKA KLIK AGAR AMAN DARI ERROR LOADING
window.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logika Jadwal (Buka-Tutup)
    document.querySelectorAll('.accordion').forEach(btn => { 
        btn.addEventListener('click', () => { 
            const target = document.getElementById(btn.dataset.target); 
            const chev = btn.querySelector('.chev'); 
            if(!target) return; 
            const opened = target.style.display === 'block'; 
            document.querySelectorAll('.panel').forEach(p => { 
                p.style.display = 'none'; 
                p.previousElementSibling.querySelector('.chev').style.transform = 'rotate(0deg)'; 
            }); 
            if(!opened) { 
                target.style.display = 'block'; 
                chev.style.transform = 'rotate(90deg)'; 
            } 
        }); 
    });

    // 2. Fitur Baru: Klik Major Alliance untuk Auto-Scroll ke Jadwal
    document.querySelectorAll('.alliance').forEach(el => {
        el.style.cursor = 'pointer'; // Ubah kursor jadi mode klik (tangan)
        el.addEventListener('click', () => {
            let targetId = '';
            // Deteksi aliansi mana yang dipencet
            if(el.classList.contains('kor')) targetId = 'kor-panel';
            if(el.classList.contains('kpk')) targetId = 'grd-panel';
            if(el.classList.contains('bee')) targetId = 'bee-panel';
            if(el.classList.contains('tur')) targetId = 'tur-panel';
            if(el.classList.contains('wbe')) targetId = 'wbe-panel';
            if(el.classList.contains('hel')) targetId = 'hel-panel';

            if(targetId) {
                const accordionBtn = document.querySelector(`.accordion[data-target="${targetId}"]`);
                if(accordionBtn) {
                    // Geser layar ke jadwal aliansi yang dituju
                    accordionBtn.scrollIntoView({behavior: "smooth", block: "center"});
                    
                    // Buka otomatis jadwalnya jika posisinya sedang tertutup
                    const panel = document.getElementById(targetId);
                    if(panel && panel.style.display !== 'block') {
                        accordionBtn.click(); 
                    }
                }
            }
        });
    });

});

/* ==========================================
   4A. CALCULATORS LOGIC (FC & CHIEF GEAR)
========================================== */
window.calculateFC = function() {
    const current = parseInt(document.getElementById('fc-current').value);
    const target = parseInt(document.getElementById('fc-target').value);
    const resultBox = document.getElementById('result-calc');
    resultBox.style.display = 'block'; resultBox.innerHTML = '';

    if (current >= target) { 
        resultBox.innerHTML = "<span style='color:#ff4d4d'>⚠️ Target must be higher than Current!</span>"; 
        return; 
    }

    // Data diekstrak dari tabel panduan
    // Format: [Red FC, Gold Refined FC]
    const fcData = [
        null, // Level 0 -> 0
        { fur: [660, 0], emb: [165, 0], cmd: [130, 0], inf: [295, 0], lan: [295, 0], mar: [295, 0], med: [130, 0], war: [0, 0] }, // Ke FC 1
        { fur: [790, 0], emb: [195, 0], cmd: [155, 0], inf: [355, 0], lan: [355, 0], mar: [355, 0], med: [155, 0], war: [355, 0] }, // Ke FC 2
        { fur: [1190, 0], emb: [295, 0], cmd: [235, 0], inf: [535, 0], lan: [535, 0], mar: [535, 0], med: [235, 0], war: [535, 0] }, // Ke FC 3
        { fur: [1400, 0], emb: [350, 0], cmd: [280, 0], inf: [630, 0], lan: [630, 0], mar: [630, 0], med: [280, 0], war: [630, 0] }, // Ke FC 4
        { fur: [1675, 0], emb: [415, 0], cmd: [335, 0], inf: [750, 0], lan: [750, 0], mar: [750, 0], med: [335, 0], war: [750, 0] }, // Ke FC 5
        { fur: [900, 60], emb: [225, 13], cmd: [180, 13], inf: [405, 25], lan: [405, 25], mar: [405, 25], med: [180, 13], war: [405, 25] }, // Ke FC 6
        { fur: [1080, 90], emb: [270, 19], cmd: [216, 19], inf: [486, 37], lan: [486, 37], mar: [486, 37], med: [216, 19], war: [486, 37] }, // Ke FC 7
        { fur: [1080, 120], emb: [270, 30], cmd: [216, 24], inf: [486, 54], lan: [486, 54], mar: [486, 54], med: [216, 24], war: [486, 54] }, // Ke FC 8
        { fur: [1260, 180], emb: [315, 43], cmd: [252, 36], inf: [567, 79], lan: [567, 79], mar: [567, 79], med: [252, 36], war: [567, 79] }, // Ke FC 9
        { fur: [1575, 420], emb: [391, 103], cmd: [315, 84], inf: [706, 187], lan: [706, 187], mar: [706, 187], med: [315, 84], war: [706, 187] } // Ke FC 10
    ];

    let sums = { fur: [0, 0], emb: [0, 0], cmd: [0, 0], inf: [0, 0], lan: [0, 0], mar: [0, 0], med: [0, 0], war: [0, 0] };

    // Akumulasi biaya per bangunan berdasarkan target level
    for (let i = current + 1; i <= target; i++) {
        if (fcData[i]) {
            for (let key in sums) {
                sums[key][0] += fcData[i][key][0]; // Red FC
                sums[key][1] += fcData[i][key][1]; // Gold FC
            }
        }
    }

    const bNames = {
        fur: "🏰 Furnace", emb: "🤝 Embassy", cmd: "⚔️ Command", 
        inf: "🛡️ Infantry", lan: "🐎 Lancer", mar: "🏹 Marksman", 
        med: "🏥 Infirmary", war: "🎓 War Academy"
    };

    const fmt = (num) => num.toLocaleString();

    let html = `<div style="font-size:13px; color:#aaa; margin-bottom:10px; text-align:center;">Cost Breakdown (FC ${current} ➔ FC ${target})</div>`;
    
    // Bikin grid 2 kolom untuk rincian
    html += `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">`;

    let totalR = 0; let totalG = 0;

    for (let key in sums) {
        let r = sums[key][0];
        let g = sums[key][1];
        totalR += r;
        totalG += g;
        
        // Sembunyikan War Academy kalau biayanya 0 (misal cuma hitung sampai FC 1)
        if (r === 0 && g === 0) continue; 

        let gText = g > 0 ? `<div style="color:#ffd700; font-size:11px; margin-top:2px;">🌟 ${fmt(g)}</div>` : "";
        
        html += `
        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:8px; border-radius:8px;">
            <div style="font-size:11px; color:#bfcfe0; margin-bottom:4px;">${bNames[key]}</div>
            <div style="font-weight:bold; font-size:13px;">
                <span style="color:#ff5c5c;">🔥 ${fmt(r)}</span>
                ${gText}
            </div>
        </div>`;
    }
    
    html += `</div>`;

    // KOTAK TOTAL KESELURUHAN DI BAWAH
    let tGoldText = totalG > 0 ? `<div style="font-size:16px; font-weight:bold; color:#ffd700; margin-top:4px; display:flex; align-items:center; justify-content:center; gap:6px;">🌟 ${fmt(totalG)} <span style="font-size:12px; color:#fffacd; font-weight:normal;">(Refined)</span></div>` : "";

    html += `
    <div style="margin-top:10px; background:rgba(255,92,92,0.1); border:1px solid rgba(255,92,92,0.3); padding:10px; border-radius:8px; text-align:center;">
        <div style="font-size:12px; color:#ffcccc; margin-bottom:4px;">TOTAL REQUIRED</div>
        <div style="font-size:16px; font-weight:bold; color:#ff5c5c; display:flex; align-items:center; justify-content:center; gap:6px;">
            🔥 ${fmt(totalR)} <span style="font-size:12px; color:#ffcccc; font-weight:normal;">(Fire Crystal)</span>
        </div>
        ${tGoldText}
    </div>`;

    resultBox.innerHTML = html;
}
const cgLevels = [
    { name: "Unequipped / Start", alloy:0, polish:0, plan:0, amber:0 },
    { name: "Green (Uncommon) 0★", alloy:1500, polish:15, plan:0, amber:0 },
    { name: "Green (Uncommon) 1★", alloy:3800, polish:40, plan:0, amber:0 },
    { name: "Blue (Rare) 0★", alloy:7000, polish:70, plan:0, amber:0 },
    { name: "Blue (Rare) 1★", alloy:9700, polish:95, plan:0, amber:0 },
    { name: "Blue (Rare) 2★", alloy:0, polish:0, plan:45, amber:0 },
    { name: "Blue (Rare) 3★", alloy:0, polish:0, plan:50, amber:0 },
    { name: "Purple (Epic) 0★", alloy:0, polish:0, plan:60, amber:0 },
    { name: "Purple (Epic) 1★", alloy:0, polish:0, plan:70, amber:0 },
    { name: "Purple (Epic) 2★", alloy:6500, polish:65, plan:40, amber:0 },
    { name: "Purple (Epic) 3★", alloy:8000, polish:80, plan:50, amber:0 },
    { name: "Purple (Epic) T1 0★", alloy:10000, polish:95, plan:60, amber:0 },
    { name: "Purple (Epic) T1 1★", alloy:11000, polish:110, plan:70, amber:0 },
    { name: "Purple (Epic) T1 2★", alloy:13000, polish:130, plan:85, amber:0 },
    { name: "Purple (Epic) T1 3★", alloy:15000, polish:160, plan:100, amber:0 },
    { name: "Gold (Mythic) 0★", alloy:22000, polish:220, plan:40, amber:0 },
    { name: "Gold (Mythic) 1★", alloy:23000, polish:230, plan:40, amber:0 },
    { name: "Gold (Mythic) 2★", alloy:25000, polish:250, plan:45, amber:0 },
    { name: "Gold (Mythic) 3★", alloy:26000, polish:260, plan:45, amber:0 },
    { name: "Gold (Mythic) T1 0★", alloy:28000, polish:280, plan:45, amber:0 },
    { name: "Gold (Mythic) T1 1★", alloy:30000, polish:300, plan:55, amber:0 },
    { name: "Gold (Mythic) T1 2★", alloy:32000, polish:320, plan:55, amber:0 },
    { name: "Gold (Mythic) T1 3★", alloy:35000, polish:340, plan:55, amber:0 },
    { name: "Gold (Mythic) T2 0★", alloy:38000, polish:360, plan:55, amber:0 },
    { name: "Gold (Mythic) T2 1★", alloy:43000, polish:430, plan:75, amber:0 },
    { name: "Gold (Mythic) T2 2★", alloy:45000, polish:460, plan:80, amber:0 },
    { name: "Gold (Mythic) T2 3★", alloy:48000, polish:500, plan:85, amber:0 },
    { name: "Red (Legendary) 0★", alloy:50000, polish:530, plan:85, amber:10 },
    { name: "Red (Legendary) 1★", alloy:52000, polish:560, plan:90, amber:10 },
    { name: "Red (Legendary) 2★", alloy:54000, polish:590, plan:95, amber:10 },
    { name: "Red (Legendary) 3★", alloy:56000, polish:620, plan:100, amber:10 },
    { name: "Red (Legendary) T1 0★", alloy:59000, polish:670, plan:110, amber:15 },
    { name: "Red (Legendary) T1 1★", alloy:61000, polish:700, plan:115, amber:15 },
    { name: "Red (Legendary) T1 2★", alloy:63000, polish:730, plan:120, amber:15 },
    { name: "Red (Legendary) T1 3★", alloy:65000, polish:760, plan:125, amber:15 },
    { name: "Red (Legendary) T2 0★", alloy:68000, polish:810, plan:135, amber:20 },
    { name: "Red (Legendary) T2 1★", alloy:70000, polish:840, plan:140, amber:20 },
    { name: "Red (Legendary) T2 2★", alloy:72000, polish:870, plan:145, amber:20 },
    { name: "Red (Legendary) T2 3★", alloy:74000, polish:900, plan:150, amber:20 },
    { name: "Red (Legendary) T3 0★", alloy:77000, polish:950, plan:160, amber:25 },
    { name: "Red (Legendary) T3 1★", alloy:80000, polish:990, plan:165, amber:25 },
    { name: "Red (Legendary) T3 2★", alloy:83000, polish:1030, plan:170, amber:25 },
    { name: "Red (Legendary) T3 3★", alloy:86000, polish:1070, plan:180, amber:25 },
    { name: "Red (Legendary) T4 0★", alloy:120000, polish:1500, plan:250, amber:40 },
    { name: "Red (Legendary) T4 1★", alloy:140000, polish:1650, plan:275, amber:40 },
    { name: "Red (Legendary) T4 2★", alloy:160000, polish:1800, plan:300, amber:40 },
    { name: "Red (Legendary) T4 3★", alloy:180000, polish:1950, plan:325, amber:40 }
];

window.addEventListener('DOMContentLoaded', () => {
    for(let i = 1; i <= 6; i++) {
        const cSel = document.getElementById('cg-c' + i);
        const tSel = document.getElementById('cg-t' + i);
        if(cSel && tSel) {
            cSel.innerHTML = ""; tSel.innerHTML = "";
            cgLevels.forEach((lvl, idx) => {
                cSel.add(new Option(lvl.name, idx));
                tSel.add(new Option(lvl.name, idx));
            });
            cSel.selectedIndex = 0; tSel.selectedIndex = 0;
        }
    }
});

window.calculateChiefGear = function() {
    let tAlloy=0, tPolish=0, tPlan=0, tAmber=0;
    let isValid = true; let activeGears = 0;
    for(let i = 1; i <= 6; i++) {
        const sIdx = parseInt(document.getElementById('cg-c' + i).value);
        const eIdx = parseInt(document.getElementById('cg-t' + i).value);
        if (sIdx > eIdx) { isValid = false; } else if (sIdx < eIdx) {
            activeGears++;
            for(let j = sIdx + 1; j <= eIdx; j++) {
                tAlloy += cgLevels[j].alloy; tPolish += cgLevels[j].polish; tPlan += cgLevels[j].plan; tAmber += cgLevels[j].amber;
            }
        }
    }
    const res = document.getElementById('result-cg'); res.style.display = 'block';
    if (!isValid) { res.innerHTML = "<span style='color:#ff5c5c'>⚠️ Target level tidak boleh lebih rendah dari Current!</span>"; return; }
    if (activeGears === 0) { res.innerHTML = "<span style='color:#aaa'>Tidak ada gear yang di-upgrade (Current = Target).</span>"; return; }
    const f = (n) => n.toLocaleString();
    let html = `<div style="font-size:13px; color:#aaa; margin-bottom:8px;">Cost for <strong>${activeGears} Gear(s)</strong> upgrading:</div>`;
    html += `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <div style="background:rgba(255,255,255,0.05); padding:6px; border-radius:6px;"><div style="color:#dcdcdc; font-weight:bold;">🔩 ${f(tAlloy)}</div><div style="font-size:10px; color:#aaa;">Hardened Alloy</div></div>
        <div style="background:rgba(255,255,255,0.05); padding:6px; border-radius:6px;"><div style="color:#fffacd; font-weight:bold;">🧪 ${f(tPolish)}</div><div style="font-size:10px; color:#aaa;">Polishing Sol.</div></div>
        <div style="background:rgba(255,255,255,0.05); padding:6px; border-radius:6px;"><div style="color:#ffe4b5; font-weight:bold;">📜 ${f(tPlan)}</div><div style="font-size:10px; color:#aaa;">Design Plans</div></div>`;
    if(tAmber > 0) { html += `<div style="background:rgba(255,165,0,0.15); border:1px solid rgba(255,165,0,0.3); padding:6px; border-radius:6px;"><div style="color:#ffa500; font-weight:bold;">💎 ${f(tAmber)}</div><div style="font-size:10px; color:#ffcc80;">Lunar Amber</div></div>`; }
    html += `</div>`;
    res.innerHTML = html;
}
/* ==========================================
   4B. CALCULATORS LOGIC (CHARMS)
========================================== */
const charmLevels = [
    { lvl: 0, guide: 0, design: 0, secret: 0 },
    { lvl: 1, guide: 5, design: 5, secret: 0 },
    { lvl: 2, guide: 40, design: 15, secret: 0 },
    { lvl: 3, guide: 60, design: 40, secret: 0 },
    { lvl: 4, guide: 80, design: 100, secret: 0 },
    { lvl: 5, guide: 100, design: 200, secret: 0 },
    { lvl: 6, guide: 120, design: 300, secret: 0 },
    { lvl: 7, guide: 140, design: 400, secret: 0 },
    { lvl: 8, guide: 200, design: 400, secret: 0 },
    { lvl: 9, guide: 300, design: 400, secret: 0 },
    { lvl: 10, guide: 420, design: 420, secret: 0 },
    { lvl: 11, guide: 560, design: 420, secret: 0 },
    { lvl: 12, guide: 580, design: 450, secret: 15 },
    { lvl: 13, guide: 580, design: 450, secret: 30 },
    { lvl: 14, guide: 600, design: 500, secret: 45 },
    { lvl: 15, guide: 600, design: 500, secret: 70 },
    { lvl: 16, guide: 650, design: 550, secret: 100 }
];

window.addEventListener('DOMContentLoaded', () => {
    for(let i = 1; i <= 6; i++) {
        const cSel = document.getElementById('charm-c' + i);
        const tSel = document.getElementById('charm-t' + i);
        if(cSel && tSel) {
            cSel.innerHTML = ""; tSel.innerHTML = "";
            charmLevels.forEach((l) => {
                cSel.add(new Option(`Level ${l.lvl}`, l.lvl));
                tSel.add(new Option(`Level ${l.lvl}`, l.lvl));
            });
            cSel.selectedIndex = 0; tSel.selectedIndex = 0;
        }
    }
});

window.calculateCharms = function() {
    let tGuide = 0, tDesign = 0, tSecret = 0;
    let isValid = true; let activeCharms = 0;
    for(let i = 1; i <= 6; i++) {
        const sIdx = parseInt(document.getElementById('charm-c' + i).value);
        const eIdx = parseInt(document.getElementById('charm-t' + i).value);
        if (sIdx > eIdx) { isValid = false; } else if (sIdx < eIdx) {
            activeCharms++;
            for(let j = sIdx + 1; j <= eIdx; j++) {
                if(charmLevels[j]) { tGuide += charmLevels[j].guide; tDesign += charmLevels[j].design; tSecret += charmLevels[j].secret; }
            }
        }
    }
    const res = document.getElementById('result-charm'); res.style.display = 'block';
    if (!isValid) { res.innerHTML = "<span style='color:#ff5c5c'>⚠️ Target level tidak boleh lebih rendah dari Current!</span>"; return; }
    if (activeCharms === 0) { res.innerHTML = "<span style='color:#aaa'>Tidak ada Charm yang di-upgrade (Current = Target).</span>"; return; }
    const f = (n) => n.toLocaleString();
    let html = `<div style="font-size:13px; color:#aaa; margin-bottom:8px;">Cost for <strong>${activeCharms} Charm(s)</strong> upgrading:</div>`;
    html += `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:6px; text-align:center;"><div style="color:#d2b48c; font-weight:bold; font-size:1.1em;">📘 ${f(tGuide)}</div><div style="font-size:10px; color:#aaa;">Charm Guide</div></div>
        <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:6px; text-align:center;"><div style="color:#ffe4b5; font-weight:bold; font-size:1.1em;">📜 ${f(tDesign)}</div><div style="font-size:10px; color:#aaa;">Charm Design</div></div>`;
    if(tSecret > 0) { html += `<div style="grid-column: span 2; background:rgba(255,100,100,0.15); border:1px solid rgba(255,100,100,0.3); padding:8px; border-radius:6px; text-align:center;"><div style="color:#ff5c5c; font-weight:bold; font-size:1.1em;">📕 ${f(tSecret)}</div><div style="font-size:10px; color:#ffcccc;">Jewel Secret</div></div>`; }
    html += `</div>`;
    res.innerHTML = html;
}

/* ==========================================
   5. COUNTDOWN TIMERS & DATES (LIVE FIREBASE)
========================================== */
window.activeSchedules = [];

// Mesin Pintar: Membaca jadwal LANGSUNG dari teks di HTML
window.rebuildSchedules = function() {
    const anchorBear="2026-01-28"; const anchorFoundry="2026-01-25"; const anchorCanyon="2026-01-25"; const anchorCJ_Tue="2026-01-27"; const anchorCJ_Thu="2026-01-29";
    let newSchedules = [];

    document.querySelectorAll('.accordion').forEach(btn => {
        const alliEl = btn.querySelector('.alias');
        if(!alliEl) return;
        const alli = alliEl.innerText.trim();
        const panel = document.getElementById(btn.getAttribute('data-target'));
        if(!panel) return;

        panel.querySelectorAll('.event-row').forEach(row => {
            const eventNameEl = row.querySelector('.event-name span');
            if(!eventNameEl) return;
            const i18n = eventNameEl.getAttribute('data-i18n');
            const timeText = row.querySelector('.event-time').innerText;

            if(timeText.includes('...')) return; // Abaikan loading data

            const times = timeText.split('&').map(t => t.trim());
            // Keamanan: Jika format kacau, lewati agar timer tidak rusak
            if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(times[0])) return; 

            let eventName = ""; let cycle = 0; let anchors = [];

            if(i18n === 'evBearTrap') {
                eventName = "Bear Trap"; cycle = 48;
                anchors = times.map(t => `${anchorBear}T${t}:00Z`);
            } else if(i18n === 'evFoundry') {
                eventName = "Foundry"; cycle = 336;
                anchors = times.map(t => `${anchorFoundry}T${t}:00Z`);
            } else if(i18n === 'evCanyon') {
                eventName = "Canyon"; cycle = 672;
                anchors = times.map(t => `${anchorCanyon}T${t}:00Z`);
            } else if(i18n === 'evCrazyJoe') {
                eventName = "Crazy Joe"; cycle = 336;
                if(times.length === 2) {
                    anchors = [`${anchorCJ_Tue}T${times[0]}:00Z`, `${anchorCJ_Thu}T${times[1]}:00Z`];
                } else {
                    anchors = [`${anchorCJ_Tue}T${times[0]}:00Z`, `${anchorCJ_Thu}T${times[0]}:00Z`];
                }
            }
            if(eventName) newSchedules.push({ alli, name: eventName, cycle, anchors });
        });
    });
    window.activeSchedules = newSchedules;
};

function getNextEvent() {
    if(window.activeSchedules.length === 0) window.rebuildSchedules();
    const now = new Date();
    let upcoming = [];
    window.activeSchedules.forEach(item => {
        item.anchors.forEach(anchorStr => {
            let nextDate = new Date(anchorStr);
            const intervalMs = item.cycle * 3600 * 1000;
            while(nextDate <= now) { nextDate = new Date(nextDate.getTime() + intervalMs); }
            upcoming.push({ alli: item.alli, name: item.name, time: nextDate });
        });
    });
    upcoming.sort((a,b) => a.time - b.time);
    return upcoming[0];
}

window.updateCountdown = function() {
    const next = getNextEvent();
    const elName = document.getElementById('nextEventName');
    const elDate = document.getElementById('nextEventDate');
    const elD = document.getElementById('cdDays');
    const elH = document.getElementById('cdHours');
    const elM = document.getElementById('cdMinutes');
    const elS = document.getElementById('cdSeconds');
    
    if(!next) { elName.innerText = "No Event"; return; }
    
    let translatedName = typeof tEventName === 'function' ? tEventName(next.name) : next.name;
    elName.innerHTML = `<span class="${next.alli.toLowerCase()}">${next.alli}</span> • ${translatedName}`;
    
    const utcH = String(next.time.getUTCHours()).padStart(2,'0');
    const utcM = String(next.time.getUTCMinutes()).padStart(2,'0');
    elDate.innerText = `At ${utcH}:${utcM} UTC`;
    
    function tick() {
        const now = new Date();
        const diff = Math.floor((next.time - now) / 1000);
        if(diff <= 0) { setTimeout(window.updateCountdown, 1000); return; }
        const d = Math.floor(diff / 86400);
        const h = Math.floor((diff % 86400) / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        if(d > 0) { elD.style.display = 'inline-block'; elD.innerText = d + 'd'; } else { elD.style.display = 'none'; }
        elH.innerText = String(h).padStart(2,'0');
        elM.innerText = String(m).padStart(2,'0');
        elS.innerText = String(s).padStart(2,'0');
    }
    tick();
    if(window._cdInterval) clearInterval(window._cdInterval);
    window._cdInterval = setInterval(tick, 1000);
};

window.updateCountdown();
// Buka panel KOR otomatis di awal
setTimeout(() => { const p = document.getElementById('kor-panel'); if(p) { p.style.display = 'block'; document.querySelectorAll('.accordion')[0].querySelector('.chev').style.transform = 'rotate(90deg)'; } }, 500);
/* ==========================================
   6. SERVER AGE & BIG TIMERS (SVS / SFC)
========================================== */
document.addEventListener("DOMContentLoaded", function() { 
    const serverStartDate = new Date(2024,9,19); 
    const today = new Date(); 
    const diffTime = Math.abs(today - serverStartDate); 
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const ageElement = document.getElementById("server-age"); 
    if(ageElement) {
        ageElement.innerText = diffDays;
        ageElement.style.color = "#ff4d4d";
        ageElement.style.fontWeight = "bold";
    } 
});

(function() { 
    const svsBase = new Date("2026-01-31T12:00:00Z"); 
    const sfcBase = new Date("2026-02-14T12:00:00Z"); 
    const cycleMs = 28 * 24 * 60 * 60 * 1000; 
    
    function getNextDate(baseDate) { 
        const now = new Date(); 
        let next = new Date(baseDate.getTime()); 
        while(next.getTime() + 86400000 < now.getTime()) {
            next = new Date(next.getTime() + cycleMs);
        } 
        return next; 
    } 
    
    function updateBigTimers() { 
        const now = new Date().getTime(); 
        
        // Timer SVS
        const nextSvS = getNextDate(svsBase); 
        const diffSvS = nextSvS.getTime() - now; 
        const dateFmt = { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'UTC' }; 
        
        const svsDateEl = document.getElementById("svs-date-display");
        if(svsDateEl) svsDateEl.innerText = nextSvS.toLocaleDateString('en-GB', dateFmt) + " UTC"; 
        
        const svsTimerEl = document.getElementById("svs-timer");
        const svsCardEl = document.getElementById("svs-card");
        
        if(diffSvS < 0 && diffSvS > -86400000) {
            if(svsTimerEl) svsTimerEl.innerHTML = "⚠️ WAR ACTIVE!";
            if(svsCardEl) svsCardEl.classList.add("active-war");
        } else {
            if(svsCardEl) svsCardEl.classList.remove("active-war");
            renderTime("svs-timer", diffSvS);
        } 
        
        // Timer SFC
        const nextSFC = getNextDate(sfcBase); 
        const diffSFC = nextSFC.getTime() - now; 
        
        const sfcDateEl = document.getElementById("sfc-date-display");
        if(sfcDateEl) sfcDateEl.innerText = nextSFC.toLocaleDateString('en-GB', dateFmt) + " UTC"; 
        
        const sfcTimerEl = document.getElementById("sfc-timer");
        if(diffSFC < 0 && diffSFC > -86400000) {
            if(sfcTimerEl) sfcTimerEl.innerHTML = "🛡️ BATTLE ACTIVE!";
        } else {
            renderTime("sfc-timer", diffSFC);
        } 
    } 
    
    function renderTime(id, ms) { 
        if(ms < 0) ms += cycleMs; 
        const d = Math.floor(ms / (1000 * 60 * 60 * 24)); 
        const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
        const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)); 
        const s = Math.floor((ms % (1000 * 60)) / 1000); 
        
        const el = document.getElementById(id);
        if(el) el.innerText = `${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`; 
    } 
    
    setInterval(updateBigTimers, 1000); 
    updateBigTimers(); 
})();
