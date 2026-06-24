let data =
JSON.parse(localStorage.getItem("transaksi")) || [];

let chart;


tampilData();



function hitung(){


let produk =
document.getElementById("produk").value;


let kategori =
document.getElementById("kategori").value;


let stok =
Number(document.getElementById("stok").value);


let modal =
Number(document.getElementById("modal").value);


let jual =
Number(document.getElementById("jual").value);


let jumlah =
Number(document.getElementById("jumlah").value);



if(jumlah > stok){

alert("Stok tidak cukup!");

return;

}



let untung =
(jual-modal)*jumlah;



stok = stok - jumlah;



document.getElementById("hasil").innerHTML =
"Untung: Rp "+untung;




let transaksi={


produk:produk,

kategori:kategori,

stok:stok,

modal:modal,

jual:jual,

jumlah:jumlah,

untung:untung,

tanggal:new Date().toLocaleDateString()


};



data.push(transaksi);



localStorage.setItem(
"transaksi",
JSON.stringify(data)
);



tampilData();


}




function tampilData(){


let tabel =
document.getElementById("riwayat");



tabel.innerHTML=`

<tr>

<th>Produk</th>
<th>Kategori</th>
<th>Stok</th>
<th>Modal</th>
<th>Jual</th>
<th>Jumlah</th>
<th>Untung</th>
<th>Tanggal</th>

</tr>

`;



data.forEach(item=>{


let row =
tabel.insertRow();


row.insertCell(0).innerHTML=item.produk;

row.insertCell(1).innerHTML=item.kategori;

row.insertCell(2).innerHTML=item.stok;

row.insertCell(3).innerHTML=item.modal;

row.insertCell(4).innerHTML=item.jual;

row.insertCell(5).innerHTML=item.jumlah;

row.insertCell(6).innerHTML=item.untung;

row.insertCell(7).innerHTML=item.tanggal;



});



dashboard();

buatGrafik();

cekStok();


}




function dashboard(){


let totalJual=0;

let totalUntung=0;



data.forEach(x=>{


totalJual +=
x.jual*x.jumlah;


totalUntung +=
x.untung;


});



totalJual.innerHTML =
"Rp "+totalJual;


totalUntung.innerHTML =
"Rp "+totalUntung;


jumlahTransaksi.innerHTML =
data.length;


}





function buatGrafik(){


let nama=[];

let nilai=[];



data.forEach(x=>{


nama.push(x.produk);

nilai.push(x.untung);


});



if(chart){

chart.destroy();

}



chart=new Chart(
document.getElementById("grafik"),
{

type:"bar",

data:{


labels:nama,


datasets:[{

label:"Keuntungan",

data:nilai

}]


}

});


}





function cekStok(){


let pesan="";



data.forEach(item=>{


if(item.stok<=10 && item.stok>0){


pesan +=
"⚠️ "+item.produk+
" stok tersisa "+
item.stok+
"<br>";

}



if(item.stok==0){


pesan +=
"❌ "+item.produk+
" HABIS<br>";

}


});



document.getElementById("peringatan")
.innerHTML=pesan;


}




function hapusData(){


if(confirm("Hapus semua data?")){


localStorage.removeItem("transaksi");


data=[];


tampilData();


}

}





function exportData(){


let csv =
"Produk,Kategori,Stok,Modal,Jual,Jumlah,Untung,Tanggal\n";



data.forEach(x=>{


csv +=

`${x.produk},${x.kategori},${x.stok},${x.modal},${x.jual},${x.jumlah},${x.untung},${x.tanggal}\n`;


});



let file =
new Blob([csv],
{type:"text/csv"});


let a =
document.createElement("a");


a.href =
URL.createObjectURL(file);


a.download =
"laporan-usaha.csv";


a.click();


}