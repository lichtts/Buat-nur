*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    background:linear-gradient(135deg,#eef6f8,#d8e7ec,#cddfe5);
}

/* Background */
.background{
    position:fixed;
    inset:0;
    background:
    radial-gradient(circle at top left, rgba(255,255,255,.8), transparent 40%),
    radial-gradient(circle at bottom right, rgba(180,210,220,.5), transparent 35%);
    z-index:-2;
}

/* Efek blur */
.background::after{
    content:"";
    position:absolute;
    width:350px;
    height:350px;
    border-radius:50%;
    background:rgba(255,255,255,.35);
    filter:blur(80px);
    top:-100px;
    right:-100px;
}

/* Card */
.card{
    width:90%;
    max-width:430px;

    padding:40px;

    border-radius:28px;

    background:rgba(255,255,255,.25);

    backdrop-filter:blur(18px);

    border:1px solid rgba(255,255,255,.35);

    text-align:center;

    box-shadow:0 20px 40px rgba(0,0,0,.15);
}

h1{
    color:#234;
    font-size:32px;
    margin-bottom:50px;
}

.buttons{
    position:relative;
    height:130px;
}

button{
    border:none;
    padding:14px 35px;
    border-radius:14px;
    font-size:18px;
    cursor:pointer;
    transition:.25s;
}

button:hover{
    transform:scale(1.05);
}

#yesBtn{
    position:absolute;
    left:40px;
    background:#4CAF50;
    color:white;
}

#noBtn{
    position:absolute;
    right:40px;
    background:#ef4444;
    color:white;
}
