let mydivOb=document.querySelector("#mydiv");
            let classdivOb=document.querySelector(".abc");
            let firsth1=document.querySelector("h1");
            alert(mydivOb.textContent);
            alert(classdivOb.textContent);
            alert(firsth1.textContent);
            let allh1=document.querySelectorAll("h1");
            allh1[0].style.color="blue";
            allh1[1].style.color="purple";