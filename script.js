$(()=>{
    
     $.getJSON('/feed.json',feed=>{

        do{
            var top = feed[Math.floor(Math.random()*feed.length)];
        }while(!top.image);
        console.log(top.image)
        $('#top').css('background',`linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5)),url(${top.image})`);
        $('#top').html(`<div><span>${top.title}</span><span>${top.date}</span></div>`);
        $('#top').attr('href',`/${top.date.replace(/\//g,'-')}-${top.title.toLowerCase().replace(/ /g,'-').normalize("NFD").replace(/[\u0300-\u036f]/g,'')}`);

        feed.sort(()=>Math.random()-.5);
        feed.forEach(n=>{
            if(n.content) $('#stories').append(`<div href="/${n.date.replace(/\//g,'-')}-${n.title.toLowerCase().replace(/ /g,'-').normalize("NFD").replace(/[\u0300-\u036f]/g,'')}"><div style="background-image:url(${n.image})"></div><span>${n.title}</span><span>${n.date}</span></div>`);
        });
        $('#stories > div').click(function(){location.href=$(this).attr('href')});
     });

     $('#top').click(function(){location.href=$(this).attr('href')});

});