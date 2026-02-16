import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- CONFIG FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyCsPDC4i9gN5RyGtNDZu8458H2-M1oFQTE",
    authDomain: "state1931-chat.firebaseapp.com",
    databaseURL: "https://state1931-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "state1931-chat",
    storageBucket: "state1931-chat.firebasestorage.app",
    messagingSenderId: "623474241926",
    appId: "1:623474241926:web:cc5e8e2665bbca80ca3c07",
    measurementId: "G-WE3EQD6J7J"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'state1931_guestbook'); 

// 1. TAMPILKAN PESAN (Dengan Tombol Hapus)
onValue(messagesRef, (snapshot) => {
    const list = document.getElementById('guestbook-list');
    list.innerHTML = "";
    const data = snapshot.val();

    if (!data) {
        const dict = window.i18n[window.currentLang] || window.i18n.en;
        list.innerHTML = `<div style="text-align:center; color:#aaa; font-size:12px; padding:10px;" data-i18n="wowEmpty">${dict.wowEmpty}</div>`;
        return;
    }

    const messages = Object.entries(data).reverse();

    messages.forEach(([key, item]) => {
        let badgeColor = "#888";
        if (item.alliance === "VLN") badgeColor = "#3bb0ff";
        if (item.alliance === "GRD") badgeColor = "#2de68c";
        if (item.alliance === "BEE") badgeColor = "#fff24f";
        if (item.alliance === "TUR") badgeColor = "#ff5c5c";
        if (item.alliance === "WBE") badgeColor = "#FF9F43";
        if (item.alliance === "HEL") badgeColor = "#D6A2E8";
        if (item.alliance === "IDN") badgeColor = "#ffffff";
        if (item.alliance === "TOP") badgeColor = "#000000";

        const div = document.createElement('div');
        div.className = 'gb-item';
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div style="font-size:13px; margin-bottom:4px;">
                    <span style="color:${badgeColor}; font-weight:800; margin-right:4px;">[${escapeHtml(item.alliance)}]</span> 
                    <span style="color:var(--neon); font-weight:700;">${escapeHtml(item.name)}</span>
                </div>
                <span onclick="hapusPesan('${key}')" style="cursor:pointer; font-size:12px; opacity:0.5;">🗑️</span>
            </div>
            <div class="gb-msg">"${escapeHtml(item.msg)}"</div>
            <div class="gb-date">${item.date}</div>
        `;
        list.appendChild(div);
    });
});

// 2. KIRIM PESAN
document.getElementById('btn-kirim').addEventListener('click', () => {
    const nameIn = document.getElementById('gb-name');
    const allyIn = document.getElementById('gb-alliance');
    const msgIn = document.getElementById('gb-msg');

    const name = nameIn.value.trim();
    const alliance = allyIn.value;
    const msg = msgIn.value.trim();
    
    const dict = window.i18n[window.currentLang] || window.i18n.en;

    if (!name || !msg || !alliance) {
        alert(dict.wowAlertInc);
        return;
    }

    push(messagesRef, {
        name: name,
        alliance: alliance,
        msg: msg,
        date: new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: Date.now()
    }).then(() => {
        nameIn.value = '';
        msgIn.value = '';
        allyIn.value = ''; 
        alert(dict.wowAlertOk); 
    }).catch((error) => {
        console.error("Error:", error);
        alert(dict.wowAlertFail); 
    });
});

// 3. FUNGSI HAPUS (DENGAN PASSWORD: grd1931)
window.hapusPesan = (id) => {
    const password = prompt("⚠️ ADMIN ONLY ⚠️\nMasukkan Kode Rahasia untuk menghapus:");
    
    if (password === "grd1931") {
        const pesanRef = ref(db, 'state1931_guestbook/' + id);
        remove(pesanRef)
          .then(() => alert("Pesan berhasil dihapus! 🗑️"))
          .catch((error) => alert("Gagal menghapus: " + error.message));
    } else if (password !== null) {
        alert("Password salah! ❌");
    }
};

function escapeHtml(text) {
    if (!text) return text;
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// --- 4. LIVE ANNOUNCEMENT BANNER ---
const announceRef = ref(db, 'state1931_announcement');

// Menampilkan banner secara real-time
onValue(announceRef, (snapshot) => {
    const data = snapshot.val();
    const banner = document.getElementById('announcement-banner');
    const textEl = document.getElementById('announcement-text');
    
    // Jika ada data pesan dan tidak kosong, tampilkan banner
    if (data && data.message && data.message.trim() !== "") {
        if (banner) banner.style.display = 'block';
        if (textEl) textEl.innerText = data.message;
    } else {
        // Sembunyikan banner jika kosong
        if (banner) banner.style.display = 'none';
    }
});

// Fungsi untuk Admin mengubah pengumuman (Klik pada banner)
window.editAnnouncement = () => {
    const password = prompt("⚠️ ADMIN ONLY ⚠️\nMasukkan Kode Rahasia untuk mengubah pengumuman:");
    
    if (password === "grd1931") {
        const textEl = document.getElementById('announcement-text');
        const currentMsg = textEl ? textEl.innerText : "";
        
        const newMsg = prompt("Masukkan pengumuman baru.\n(Kosongkan teks lalu klik OK untuk MENGHAPUS/MENYEMBUNYIKAN banner):", currentMsg);
        
        if (newMsg !== null) {
            set(announceRef, {
                message: newMsg.trim(),
                updatedAt: Date.now(),
                updatedBy: "Admin"
            }).then(() => {
                alert("Pengumuman berhasil diupdate! 📢");
            }).catch((error) => {
                alert("Gagal update: " + error.message);
            });
        }
    } else if (password !== null) {
        alert("Password salah! ❌");
    }
};
// --- 5. TERRITORY MAP (REAL-TIME UPDATE) ---
const mapRef = ref(db, 'state1931_map');

// Data default jika database masih kosong pertama kali
const defaultStrongholds = ["[BEE]", "[VLN]", "[VLN]", "[GRD]"];
const defaultFortresses = [
    "[BEE]", "[WBE]", "[GRD]", 
    "[TUR]", "[VLN]", "[HEL]", 
    "[TUR]", "[VLN]", "[GRD]", 
    "[BEE]", "[WBE]", "[HEL]"
];

// Menarik data dari Firebase dan memunculkannya ke Website
onValue(mapRef, (snapshot) => {
    const data = snapshot.val();
    let sData = defaultStrongholds;
    let fData = defaultFortresses;

    if (data) {
        if (data.strongholds) sData = data.strongholds;
        if (data.fortresses) fData = data.fortresses;
    } else {
        // Jika database kosong, otomatis simpan data default ke Firebase
        set(mapRef, {
            strongholds: defaultStrongholds,
            fortresses: defaultFortresses
        });
    }

    // Panggil fungsi renderMap yang ada di script.js
    if (window.renderMap) {
        window.renderMap(sData, "stronghold-list", "S", "strongholds");
        window.renderMap(fData, "fortress-list", "F", "fortresses");
    }
});

// --- SAKLAR RAHASIA GLOBAL (ADMIN MODE) ---
window.isAdminMode = false;

window.toggleAdminMode = () => {
    if (window.isAdminMode) {
        window.isAdminMode = false;
        alert("Mode Admin: DIMATIKAN 🔒");
        if(document.getElementById('local-time-toggle')) document.getElementById('local-time-toggle').style.display = 'block';
        if(window.renderHof) window.renderHof(); // Segarkan tampilan HOF
    } else {
        const password = prompt("⚠️ ADMIN ONLY ⚠️\nMasukkan Kode Rahasia:");
        if (password === "grd1931") {
            window.isAdminMode = true;
            
            // PAKSA MATIKAN MODE LOKAL AGAR TIDAK NABRAK SAAT EDIT
            window.isLocalTimeMode = false;
            const btn = document.getElementById('local-time-toggle');
            if(btn) {
                btn.innerText = "🕒 Show Local Time";
                btn.classList.remove("neon");
                btn.style.display = 'none'; // Sembunyikan tombolnya
            }
            
            // Kembalikan semua teks di layar ke wujud UTC aslinya
            document.querySelectorAll('.event-time').forEach(el => {
                const utcText = el.getAttribute('data-utc');
                if(utcText) { el.innerText = utcText; el.style.color = ""; }
            });

            alert("Mode Admin: AKTIF 🔓\nFitur Edit Map, Edit Jadwal, dan Edit Hall of Fame terbuka.");
            if(window.renderHof) window.renderHof(); // Munculkan tombol tambah HOF
        } else if (password !== null) {
            alert("Password salah! ❌");
        }
    }
};

// --- FUNGSI UPDATE MAP ---
window.editMapItem = (type, index, currentOwner) => {
    if (!window.isAdminMode) return; 
    const cleanOwner = currentOwner.replace(/[\[\]]/g, '');
    let newOwner = prompt(`Ubah pemilik benteng ini:\n(Sekarang: ${cleanOwner})\n\nKetik tag baru (contoh: VLN, GRD):`, cleanOwner);
    if (newOwner !== null && newOwner.trim() !== "") {
        newOwner = `[${newOwner.trim().toUpperCase()}]`;
        set(ref(db, `state1931_map/${type}/${index}`), newOwner).catch(err => alert("Gagal update map: " + err.message));
    }
};

// --- 7. AUTO-CONVERT WAKTU LOKAL (MESIN TOPENG) ---
window.isLocalTimeMode = false;

window.convertToLocal = (utcStr) => {
    if(!utcStr || utcStr.includes('...')) return utcStr;
    return utcStr.split('&').map(t => {
        t = t.trim();
        if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(t)) return t; 
        const [h, m] = t.split(':');
        const date = new Date();
        // Buat dummy date dengan jam UTC tersebut
        date.setUTCHours(parseInt(h), parseInt(m), 0, 0);
        // Konversi ke jam lokal perangkat
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }).join(' & ');
};

window.renderTimeMode = (el, utcText) => {
    if(window.isLocalTimeMode) {
        el.innerText = window.convertToLocal(utcText);
        el.style.color = "#58a6ff"; // Warna Biru Neon penanda Mode Lokal
    } else {
        el.innerText = utcText;
        el.style.color = ""; // Putih bersih untuk UTC
    }
};

window.toggleLocalTime = () => {
    if(window.isAdminMode) {
        alert("⚠️ Matikan Mode Admin dulu!");
        return;
    }
    window.isLocalTimeMode = !window.isLocalTimeMode;
    const btn = document.getElementById('local-time-toggle');
    if(btn) {
        if(window.isLocalTimeMode) {
            btn.innerText = "🌍 Local Time: ON";
            btn.classList.add("neon"); // Nyalakan efek neon
        } else {
            btn.innerText = "🕒 Show Local Time";
            btn.classList.remove("neon");
        }
    }
    
    // Ganti wujud semua jam di layar!
    document.querySelectorAll('.event-time').forEach(el => {
        const utcText = el.getAttribute('data-utc');
        if(utcText) window.renderTimeMode(el, utcText);
    });
};

// --- 6. SCHEDULE EDIT & SYNC (ANTI-ERROR & LOCAL TIME) ---
const scheduleRef = ref(db, 'state1931_schedules');

onValue(scheduleRef, (snapshot) => {
    const data = snapshot.val();
    document.querySelectorAll('.accordion').forEach(btn => {
        const alli = btn.querySelector('.alias').innerText.trim();
        const panel = document.getElementById(btn.getAttribute('data-target'));
        if(!panel) return;

        panel.querySelectorAll('.event-row').forEach(row => {
            const eventNameEl = row.querySelector('.event-name span');
            const timeEl = row.querySelector('.event-time');
            const i18n = eventNameEl.getAttribute('data-i18n');
            
            let dbKeyName = "";
            if(i18n === 'evBearTrap') dbKeyName = "BearTrap";
            if(i18n === 'evFoundry') dbKeyName = "Foundry";
            if(i18n === 'evCanyon') dbKeyName = "Canyon";
            if(i18n === 'evCrazyJoe') dbKeyName = "CrazyJoe";

            const dbKey = `${alli}_${dbKeyName}`;
            
            // Ambil data dari Firebase ATAU dari teks asli HTML
            let utcText = (data && data[dbKey]) ? data[dbKey] : (timeEl.getAttribute('data-utc') || timeEl.innerText);
            
            // Simpan UTC Asli sebagai 'Data Bawah Tanah'
            timeEl.setAttribute('data-utc', utcText);
            
            // Render tampilannya (tergantung saklar sedang ON/OFF)
            window.renderTimeMode(timeEl, utcText);
        });
    });
    
    // Sinkronkan ke Countdown Timer raksasa di atas
    if(window.rebuildSchedules) {
        window.rebuildSchedules();
        if(window.updateCountdown) window.updateCountdown();
    }
});

// Fitur Klik Untuk Edit
setTimeout(() => {
    document.querySelectorAll('.event-time').forEach(el => {
        el.style.cursor = "pointer";
        el.onclick = function() {
            if(!window.isAdminMode) return; 
            
            const row = this.closest('.event-row');
            const alli = this.closest('.panel').previousElementSibling.querySelector('.alias').innerText.trim();
            const i18n = row.querySelector('.event-name span').getAttribute('data-i18n');
            
            let eventName = "", dbKeyName = "";
            if(i18n === 'evBearTrap') { eventName = "Bear Trap"; dbKeyName = "BearTrap"; }
            if(i18n === 'evFoundry') { eventName = "Foundry"; dbKeyName = "Foundry"; }
            if(i18n === 'evCanyon') { eventName = "Canyon"; dbKeyName = "Canyon"; }
            if(i18n === 'evCrazyJoe') { eventName = "Crazy Joe"; dbKeyName = "CrazyJoe"; }

            // SELALU Ambil waktu UTC Asli saat diedit, bukan waktu topeng
            const currentText = this.getAttribute('data-utc') || this.innerText; 
            const newText = prompt(`Ubah jadwal ${eventName} untuk ${alli} (Format UTC):\n(Format Wajib: HH:MM atau HH:MM & HH:MM)\n\nSekarang:`, currentText);

            if (newText !== null && newText.trim() !== "") {
                const isValid = /^([01]\d|2[0-3]):([0-5]\d)(\s*&\s*([01]\d|2[0-3]):([0-5]\d))?$/.test(newText.trim());
                if (!isValid) {
                    alert("❌ FORMAT SALAH!\nHarus persis seperti: 13:30 atau 13:30 & 15:00\n\nTimer dibatalkan untuk mencegah Error!");
                    return;
                }
                set(ref(db, `state1931_schedules/${alli}_${dbKeyName}`), newText.trim())
                    .catch(err => alert("Gagal update jadwal: " + err.message));
            }
        };
    });
}, 1000);
// --- 8. HALL OF FAME (DYNAMIC & UNLIMITED) ---
const hofRef = ref(db, 'state1931_hof');
window.hofData = [];
window.hofInitialized = false;

// Data awal jika belum pernah ada
const defaultHof = [
    { icon: "👑", name: "Mr.jhon", title: "Top Power" },
    { icon: "💀", name: "Mr jhon", title: "Top Kills" },
    { icon: "💎", name: "Mulan", title: "Top Contrib" }
];

onValue(hofRef, (snapshot) => {
    const data = snapshot.val();
    
    // Jika database kosong melompong (baru pertama di-deploy)
    if (!data && !window.hofInitialized) {
        window.hofInitialized = true;
        set(hofRef, defaultHof);
        return; 
    }
    
    window.hofInitialized = true;
    
    // Firebase kadang mengubah Array jadi Object, kita atasi di sini
    if (Array.isArray(data)) {
        window.hofData = data;
    } else if (data) {
        window.hofData = Object.values(data);
    } else {
        window.hofData = [];
    }
    
    if(window.renderHof) window.renderHof();
});

window.renderHof = () => {
    const container = document.getElementById('hof-list');
    if(!container) return;
    container.innerHTML = "";
    
    // Render kotak pemain yang ada
    window.hofData.forEach((item, index) => {
        const adminStyle = window.isAdminMode ? 'cursor:pointer; border:1px solid #ff4d4d; background:rgba(255,77,77,0.1);' : '';
        container.innerHTML += `
        <div class="hof-card" style="${adminStyle}" ${window.isAdminMode ? `onclick="editHofItem(${index})"` : ''} title="${window.isAdminMode ? 'Klik untuk Edit / Hapus' : ''}">
            <span class="crown">${item.icon}</span>
            <span class="hof-name notranslate">${item.name}</span>
            <span class="hof-desc">${item.title}</span>
        </div>`;
    });

    // Tampilkan Kotak "Tambah Baru" khusus saat Mode Admin Nyala
    if (window.isAdminMode) {
        container.innerHTML += `
        <div class="hof-card" style="cursor:pointer; border: 1px dashed #58a6ff; display:flex; flex-direction:column; justify-content:center; align-items:center; opacity:0.8;" onclick="addHofItem()">
            <span class="crown">➕</span>
            <span class="hof-name" style="color:#58a6ff;">Tambah Baru</span>
        </div>`;
    }
};

window.addHofItem = () => {
    if(!window.isAdminMode) return;
    const title = prompt("Masukkan Gelar/Kategori:\n(contoh: President, Top Healer, dll)");
    if(!title) return;
    const name = prompt(`Masukkan Nama Pemain untuk gelar [${title}]:`);
    if(!name) return;
    const icon = prompt(`Masukkan 1 Emoji untuk gelar ini:\n(contoh: 🦅, 🛡️, 🚑, 👑)`, "🏅");
    
    const newItem = { icon: icon || "🏅", name: name, title: title };
    const newData = [...window.hofData, newItem];
    
    set(hofRef, newData).catch(err => alert("Gagal menambah: " + err.message));
};

window.editHofItem = (index) => {
    if(!window.isAdminMode) return;
    const item = window.hofData[index];
    const action = prompt(`PILIH AKSI UNTUK [${item.title}]:\n\nKetik '1' untuk EDIT Nama/Emoji\nKetik '2' untuk HAPUS kotak ini\n\n(Kosongkan lalu OK untuk batal)`, "1");
    
    if (action === "1") {
        const newName = prompt("Masukkan nama pemain baru:", item.name);
        if (newName !== null && newName.trim() !== "") {
            const newIcon = prompt("Masukkan emoji baru:", item.icon);
            window.hofData[index].name = newName;
            if(newIcon) window.hofData[index].icon = newIcon;
            set(hofRef, window.hofData).catch(err => alert("Gagal update: " + err.message));
        }
    } else if (action === "2") {
        const confirmDelete = confirm(`⚠️ Yakin ingin MENGHAPUS kotak [${item.title}]?`);
        if(confirmDelete) {
            window.hofData.splice(index, 1);
            set(hofRef, window.hofData).catch(err => alert("Gagal hapus: " + err.message));
        }
    }
};
