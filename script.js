/* =====================================================
   SISTEM AKUN
===================================================== */

let akun =
    JSON.parse(
        localStorage.getItem("akunPengguna")
    ) || null;


/* ================= TAMPILKAN DAFTAR ================= */

function tampilkanDaftar(){

    document
    .getElementById("loginForm")
    .style.display = "none";

    document
    .getElementById("registerForm")
    .style.display = "block";

    document
    .getElementById("loginTitle")
    .innerText = "📝 BUAT AKUN";

    document
    .getElementById("loginDescription")
    .innerText =
    "Buat username dan password sendiri";

    document
    .getElementById("loginMessage")
    .innerText = "";

}


/* ================= KEMBALI LOGIN ================= */

function kembaliLogin(){

    document
    .getElementById("loginForm")
    .style.display = "block";

    document
    .getElementById("registerForm")
    .style.display = "none";

    document
    .getElementById("loginTitle")
    .innerText = "🔐 LOGIN";

    document
    .getElementById("loginDescription")
    .innerText =
    "Masuk ke Database Manajemen Tugas";

    document
    .getElementById("loginMessage")
    .innerText = "";

}


/* ================= BUAT AKUN ================= */

function buatAkun(){

    const username =
        document
        .getElementById("registerUsername")
        .value
        .trim();

    const password =
        document
        .getElementById("registerPassword")
        .value;

    const password2 =
        document
        .getElementById("registerPassword2")
        .value;


    if(username === "" || password === ""){

        tampilkanPesan(
            "Username dan password wajib diisi!",
            false
        );

        return;
    }


    if(username.length < 3){

        tampilkanPesan(
            "Username minimal 3 karakter!",
            false
        );

        return;
    }


    if(password.length < 4){

        tampilkanPesan(
            "Password minimal 4 karakter!",
            false
        );

        return;
    }


    if(password !== password2){

        tampilkanPesan(
            "Password tidak sama!",
            false
        );

        return;
    }


    akun = {
        username: username,
        password: password
    };


    localStorage.setItem(
        "akunPengguna",
        JSON.stringify(akun)
    );


    tampilkanPesan(
        "Akun berhasil dibuat!",
        true
    );


    setTimeout(function(){

        kembaliLogin();

        document
        .getElementById("loginUsername")
        .value = username;

        document
        .getElementById("loginPassword")
        .value = "";

    },1000);

}


/* ================= PESAN ================= */

function tampilkanPesan(
    pesan,
    berhasil
){

    const message =
        document
        .getElementById("loginMessage");

    message.innerText = pesan;


    if(berhasil){

        message.className =
        "login-success";

    }else{

        message.className =
        "login-error";

    }

}


/* ================= LOGIN ================= */

function login(){

    const username =
        document
        .getElementById("loginUsername")
        .value
        .trim();

    const password =
        document
        .getElementById("loginPassword")
        .value;


    if(!akun){

        tampilkanPesan(
            "Belum ada akun. Silakan buat akun terlebih dahulu.",
            false
        );

        return;
    }


    if(
        username === akun.username &&
        password === akun.password
    ){

        document
        .getElementById("loginPage")
        .style.display = "none";

        document
        .getElementById("loginMessage")
        .innerText = "";

    }else{

        tampilkanPesan(
            "Username atau password salah!",
            false
        );

    }

}


/* ================= BATAL LOGIN ================= */

function batalLogin(){

    document
    .getElementById("loginUsername")
    .value = "";

    document
    .getElementById("loginPassword")
    .value = "";

    document
    .getElementById("loginMessage")
    .innerText = "";

}


/* ================= ENTER LOGIN ================= */

document.addEventListener(
    "keydown",
    function(e){

        if(
            e.key === "Enter" &&
            document
            .getElementById("loginPage")
            .style.display !== "none"
        ){

            if(
                document
                .getElementById("loginForm")
                .style.display !== "none"
            ){

                login();

            }else{

                buatAkun();

            }

        }

    }
);


/* =====================================================
   DATA SISWA & TUGAS
===================================================== */

let dataSiswa =
    JSON.parse(
        localStorage.getItem("dataSiswa")
    ) || [];


let dataTugas =
    JSON.parse(
        localStorage.getItem("dataTugas")
    ) || [];


let editId = null;


/* ================= NAVIGASI ================= */

function bukaHalaman(id,element){

    document
    .querySelectorAll(".page")
    .forEach(
        page =>
        page.classList.remove("active")
    );


    const halaman =
        document.getElementById(id);


    if(halaman){

        halaman.classList.add("active");

    }


    document
    .querySelectorAll(".menu")
    .forEach(
        menu =>
        menu.classList.remove("active")
    );


    if(element){

        element.classList.add("active");

    }


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* ================= SIMPAN ================= */

function simpanData(){

    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );

    localStorage.setItem(
        "dataTugas",
        JSON.stringify(dataTugas)
    );

}


/* ================= CARI SISWA ================= */

function cariSiswa(nama){

    return dataSiswa.find(
        siswa =>
        siswa.nama.toLowerCase() ===
        nama.toLowerCase()
    );

}


/* ================= FORM TUGAS ================= */

document
.getElementById("formTugas")
.addEventListener(
    "submit",
    function(e){

        e.preventDefault();


        const nama =
            document
            .getElementById("nama")
            .value
            .trim();


        const kelas =
            document
            .getElementById("kelas")
            .value;


        const tugas =
            document
            .getElementById("tugasInput")
            .value
            .trim();


        const mapel =
            document
            .getElementById("mapel")
            .value
            .trim();


        const tanggal =
            document
            .getElementById("tanggal")
            .value;


        const status =
            document
            .getElementById("status")
            .value;


        const poin =
            Number(
                document
                .getElementById("poin")
                .value
            ) || 0;


        const keterangan =
            document
            .getElementById("keterangan")
            .value
            .trim();


        if(editId !== null){

            const index =
                dataTugas.findIndex(
                    item =>
                    item.id === editId
                );


            if(index !== -1){

                dataTugas[index] = {

                    id:editId,
                    nama:nama,
                    kelas:kelas,
                    tugas:tugas,
                    mapel:mapel,
                    tanggal:tanggal,
                    status:status,
                    poin:poin,
                    keterangan:keterangan

                };

            }


            editId = null;


            document
            .getElementById("btnSubmit")
            .innerText =
            "➕ Tambah Data";

        }else{

            dataTugas.push({

                id:Date.now(),
                nama:nama,
                kelas:kelas,
                tugas:tugas,
                mapel:mapel,
                tanggal:tanggal,
                status:status,
                poin:poin,
                keterangan:keterangan

            });

        }


        let siswa =
            cariSiswa(nama);


        if(!siswa){

            dataSiswa.push({

                id:Date.now(),
                nama:nama,
                kelas:kelas

            });

        }else{

            siswa.kelas = kelas;

        }


        simpanData();

        resetForm();

        renderAll();

    }
);


/* ================= RESET ================= */

function resetForm(){

    document
    .getElementById("formTugas")
    .reset();

    editId = null;

    document
    .getElementById("btnSubmit")
    .innerText =
    "➕ Tambah Data";

}


/* ================= DASHBOARD ================= */

function renderDashboard(){

    document
    .getElementById("totalSiswa")
    .innerText =
    dataSiswa.length;


    document
    .getElementById("totalTugas")
    .innerText =
    dataTugas.length;


    const selesai =
        dataTugas.filter(
            tugas =>
            tugas.status === "Selesai"
        ).length;


    document
    .getElementById("totalSelesai")
    .innerText =
    selesai;


    const totalPoin =
        dataTugas.reduce(
            (total,tugas) =>
            total + Number(tugas.poin || 0),
            0
        );


    document
    .getElementById("totalPoin")
    .innerText =
    totalPoin;

}


/* ================= DATA SISWA ================= */

function renderSiswa(){

    const grid =
        document
        .getElementById("studentGrid");


    const keyword =
        document
        .getElementById("cariSiswa")
        .value
        .toLowerCase();


    const hasil =
        dataSiswa.filter(
            siswa =>
            siswa.nama
            .toLowerCase()
            .includes(keyword)
        );


    grid.innerHTML = "";


    if(hasil.length === 0){

        grid.innerHTML =
        "<p>Belum ada data siswa.</p>";

        return;

    }


    hasil.forEach(
        siswa => {

            const tugasSiswa =
                dataTugas.filter(
                    tugas =>
                    tugas.nama.toLowerCase() ===
                    siswa.nama.toLowerCase()
                );


            const selesai =
                tugasSiswa.filter(
                    tugas =>
                    tugas.status === "Selesai"
                ).length;


            const totalPoin =
                tugasSiswa.reduce(
                    (total,tugas) =>
                    total +
                    Number(tugas.poin || 0),
                    0
                );


            grid.innerHTML +=
            `
            <div class="student-card">

                <h3>
                    👨‍🎓 ${siswa.nama}
                </h3>

                <p>
                    🏫 ${siswa.kelas}
                </p>

                <p>
                    📝 Jumlah Tugas:
                    <b>${tugasSiswa.length}</b>
                </p>

                <p>
                    ✅ Tugas Selesai:
                    <b>${selesai}</b>
                </p>

                <p>
                    ⭐ Total Poin:
                    <b>${totalPoin}</b>
                </p>

                <br>

                <button
                    class="btn-danger"
                    onclick="hapusSiswa(${siswa.id})"
                >
                    🗑 Hapus Siswa
                </button>

            </div>
            `;

        }
    );

}


/* ================= HAPUS SISWA ================= */

function hapusSiswa(id){

    const siswa =
        dataSiswa.find(
            item =>
            item.id === id
        );


    if(!siswa) return;


    const yakin =
        confirm(
            "Hapus siswa " +
            siswa.nama +
            " beserta semua tugasnya?"
        );


    if(!yakin) return;


    dataSiswa =
        dataSiswa.filter(
            item =>
            item.id !== id
        );


    dataTugas =
        dataTugas.filter(
            tugas =>
            tugas.nama.toLowerCase() !==
            siswa.nama.toLowerCase()
        );


    simpanData();

    renderAll();

}


/* ================= FILTER KELAS ================= */

function isiFilterKelas(){

    const filter =
        document
        .getElementById("filterKelas");


    const kelasSet =
        new Set(
            dataSiswa.map(
                siswa =>
                siswa.kelas
            )
        );


    dataTugas.forEach(
        tugas =>
        kelasSet.add(
            tugas.kelas
        )
    );


    filter.innerHTML =
    `
    <option value="">
        Semua Kelas
    </option>
    `;


    [...kelasSet]
    .sort()
    .forEach(
        kelas => {

            filter.innerHTML +=
            `
            <option value="${kelas}">
                ${kelas}
            </option>
            `;

        }
    );

}


/* ================= TABLE ================= */

function renderTable(){

    const tbody =
        document
        .getElementById("tableBody");


    const keyword =
        document
        .getElementById("cariTugas")
        .value
        .toLowerCase();


    const filterKelas =
        document
        .getElementById("filterKelas")
        .value;


    const filterStatus =
        document
        .getElementById("filterStatus")
        .value;


    const hasil =
        dataTugas.filter(
            tugas => {

                const cocokKeyword =

                    tugas.nama.toLowerCase()
                    .includes(keyword)

                    ||

                    tugas.kelas.toLowerCase()
                    .includes(keyword)

                    ||

                    tugas.tugas.toLowerCase()
                    .includes(keyword)

                    ||

                    tugas.mapel.toLowerCase()
                    .includes(keyword)

                    ||

                    tugas.keterangan.toLowerCase()
                    .includes(keyword);


                return (

                    cocokKeyword &&

                    (
                        !filterKelas ||
                        tugas.kelas === filterKelas
                    ) &&

                    (
                        !filterStatus ||
                        tugas.status === filterStatus
                    )

                );

            }
        );


    tbody.innerHTML = "";


    if(hasil.length === 0){

        tbody.innerHTML =
        `
        <tr>
            <td
                colspan="10"
                style="text-align:center"
            >
                Belum ada data tugas.
            </td>
        </tr>
        `;

        return;

    }


    hasil.forEach(
        (tugas,index) => {

            let statusClass =
                "status-belum";


            if(tugas.status === "Proses"){

                statusClass =
                "status-proses";

            }


            if(tugas.status === "Selesai"){

                statusClass =
                "status-selesai";

            }


            tbody.innerHTML +=
            `
            <tr>

                <td>${index + 1}</td>

                <td>${tugas.nama}</td>

                <td>${tugas.kelas}</td>

                <td>${tugas.tugas}</td>

                <td>${tugas.mapel}</td>

                <td>${tugas.tanggal}</td>

                <td>
                    <span
                        class="status ${statusClass}"
                    >
                        ${tugas.status}
                    </span>
                </td>

                <td>${tugas.poin}</td>

                <td>
                    ${tugas.keterangan || "-"}
                </td>

                <td>

                    <button
                        class="btn-warning"
                        onclick="editTugas(${tugas.id})"
                    >
                        ✏️
                    </button>

                    <button
                        class="btn-danger"
                        onclick="hapusTugas(${tugas.id})"
                    >
                        🗑
                    </button>

                </td>

            </tr>
            `;

        }
    );

}


/* ================= EDIT ================= */

function editTugas(id){

    const tugas =
        dataTugas.find(
            item =>
            item.id === id
        );


    if(!tugas) return;


    editId = id;


    document.getElementById("nama").value =
        tugas.nama;

    document.getElementById("kelas").value =
        tugas.kelas;

    document.getElementById("tugasInput").value =
        tugas.tugas;

    document.getElementById("mapel").value =
        tugas.mapel;

    document.getElementById("tanggal").value =
        tugas.tanggal;

    document.getElementById("status").value =
        tugas.status;

    document.getElementById("poin").value =
        tugas.poin;

    document.getElementById("keterangan").value =
        tugas.keterangan;


    document
    .getElementById("btnSubmit")
    .innerText =
    "💾 Simpan Perubahan";


    bukaHalaman(
        "dataTugasPage",
        document.querySelectorAll(".menu")[2]
    );

}


/* ================= HAPUS TUGAS ================= */

function hapusTugas(id){

    const yakin =
        confirm(
            "Yakin ingin menghapus tugas ini?"
        );


    if(!yakin) return;


    dataTugas =
        dataTugas.filter(
            tugas =>
            tugas.id !== id
        );


    simpanData();

    renderAll();

}


/* ================= RANKING ================= */

function renderRanking(){

    const rankList =
        document
        .getElementById("rankList");


    const ranking =
        dataSiswa.map(
            siswa => {

                const tugas =
                    dataTugas.filter(
                        item =>
                        item.nama.toLowerCase() ===
                        siswa.nama.toLowerCase()
                    );


                const poin =
                    tugas.reduce(
                        (total,item) =>
                        total +
                        Number(item.poin || 0),
                        0
                    );


                const selesai =
                    tugas.filter(
                        item =>
                        item.status === "Selesai"
                    ).length;


                return {

                    nama:siswa.nama,
                    kelas:siswa.kelas,
                    poin:poin,
                    selesai:selesai,
                    tugas:tugas.length

                };

            }
        );


    ranking.sort(
        (a,b) =>
        b.poin - a.poin
    );


    rankList.innerHTML = "";


    if(ranking.length === 0){

        rankList.innerHTML =
        `
        <div class="box">
            Belum ada data ranking.
        </div>
        `;

        return;

    }


    ranking.forEach(
        (siswa,index) => {

            rankList.innerHTML +=
            `
            <div class="rank-item">

                <div class="rank-left">

                    <div class="rank-number">
                        ${index + 1}
                    </div>

                    <div>

                        <h3>
                            ${siswa.nama}
                        </h3>

                        <p>
                            ${siswa.kelas}
                        </p>

                        <small>
                            ${siswa.selesai}
                            tugas selesai dari
                            ${siswa.tugas}
                            tugas
                        </small>

                    </div>

                </div>

                <div class="rank-poin">
                    ⭐ ${siswa.poin}
                </div>

            </div>
            `;

        }
    );

}


/* ================= EXPORT EXCEL ================= */

function exportExcel(){

    if(
        dataSiswa.length === 0 &&
        dataTugas.length === 0
    ){

        alert(
            "Belum ada data yang bisa diexport."
        );

        return;

    }


    const siswaExcel =
        dataSiswa.map(
            (siswa,index) => {

                const tugasSiswa =
                    dataTugas.filter(
                        tugas =>
                        tugas.nama.toLowerCase() ===
                        siswa.nama.toLowerCase()
                    );


                const selesai =
                    tugasSiswa.filter(
                        tugas =>
                        tugas.status === "Selesai"
                    ).length;


                const totalPoin =
                    tugasSiswa.reduce(
                        (total,tugas) =>
                        total +
                        Number(tugas.poin || 0),
                        0
                    );


                return {

                    "No":index + 1,

                    "Nama Siswa":
                    siswa.nama,

                    "Jurusan / Kelas":
                    siswa.kelas,

                    "Jumlah Tugas":
                    tugasSiswa.length,

                    "Tugas Selesai":
                    selesai,

                    "Total Poin":
                    totalPoin

                };

            }
        );


    const tugasExcel =
        dataTugas.map(
            (tugas,index) => {

                return {

                    "No":index + 1,

                    "Nama Siswa":
                    tugas.nama,

                    "Jurusan / Kelas":
                    tugas.kelas,

                    "Nama Tugas":
                    tugas.tugas,

                    "Mata Pelajaran":
                    tugas.mapel,

                    "Tanggal":
                    tugas.tanggal,

                    "Status":
                    tugas.status,

                    "Poin":
                    tugas.poin,

                    "Keterangan":
                    tugas.keterangan

                };

            }
        );


    const workbook =
        XLSX.utils.book_new();


    const sheetSiswa =
        XLSX.utils.json_to_sheet(
            siswaExcel
        );


    const sheetTugas =
        XLSX.utils.json_to_sheet(
            tugasExcel
        );


    XLSX.utils.book_append_sheet(
        workbook,
        sheetSiswa,
        "Data Siswa"
    );


    XLSX.utils.book_append_sheet(
        workbook,
        sheetTugas,
        "Data Tugas"
    );


    sheetSiswa["!cols"] = [

        {wch:5},
        {wch:25},
        {wch:22},
        {wch:15},
        {wch:15},
        {wch:15}

    ];


    sheetTugas["!cols"] = [

        {wch:5},
        {wch:25},
        {wch:22},
        {wch:30},
        {wch:25},
        {wch:15},
        {wch:15},
        {wch:10},
        {wch:35}

    ];


    XLSX.writeFile(
        workbook,
        "Database_Tugas_Siswa.xlsx"
    );


    alert(
        "Data berhasil diexport ke Excel!"
    );

}


/* ================= RENDER SEMUA ================= */

function renderAll(){

    renderDashboard();

    renderSiswa();

    isiFilterKelas();

    renderTable();

    renderRanking();

}


/* ================= START ================= */

renderAll();


/*
   Jika belum mempunyai akun,
   otomatis membuka halaman daftar.
*/

if(!akun){

    setTimeout(
        function(){

            tampilkanDaftar();

        },
        300
    );

}