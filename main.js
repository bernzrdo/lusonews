$(()=>{

    if('Notification' in window) Notification.requestPermission();

    if(!Cookies.get('cookies')){
        $('#cookies').show();
        $('#cookies button').click(()=>{
            Cookies.set('cookies',true);
            $('#cookies').hide();
        });
    }

    var feed;
    function marquee(){
        $('#feed a').fadeOut(400,'swing',()=>{
            var pos = Math.floor(Math.random()*feed.length);
            $('#feed a').text(feed[pos].title);
            if(feed[pos].content) $('#feed a').attr('href',`/${feed[pos].date.replace(/\//g,'-')}-${feed[pos].title.toLowerCase().replace(/ /g,'-').normalize("NFD").replace(/[\u0300-\u036f]/g,'')}`);
            else $('#feed a').removeAttr('href');
            $('#feed a').fadeIn();
        });
    }
    $.getJSON('/feed.json',f=>{
        feed = f;

        marquee();
        setInterval(marquee,5e3);

        if($('[data-news]').length){
            var $news = $('[data-news]:first');
            var news = feed[$news.attr('data-news')];
            document.title = `${news.title} - LusoNews`;
            $news.append(`<h1 id="headline">${news.title}</h1>`);
            $news.append(`<div id="author"><img src="/assets/default.jpg"><span>...</span><br><span>${news.date}</span></div>`);
            $.getJSON(`https://randomuser.me/api/?nat=br&inc=name,picture&noinfo`,author=>{
                author = author.results[0];
                $('#author img').attr('src',author.picture.thumbnail);
                $('#author span:nth-child(2)').text(`${author.name.first} ${author.name.last}`);
            });
            if(news.image) $news.append(`<img src="${news.image}">`);
            news.content.forEach(p=>{
                $news.append(`<p>${p}</p>`);
            });
            $news.append(`<div id="disqus_thread"></div><script>var disqus_config=function(){this.page.url=location.href,this.page.identifier=location.pathname.replace(/\\//g,"")};(function(){var a=document,b=a.createElement("script");b.src="https://lusonews.disqus.com/embed.js",b.setAttribute("data-timestamp",+new Date),(a.head||a.body).appendChild(b)})();</script>`);
            Math.floor(Math.random()*2);
            $news.append('<div id="recommendation"></div>');
            var $recommendation = $('#recommendation');
            feed.sort(()=>Math.random()-.5);
            feed.forEach(n=>{
                if(n.content&&n.title!=$('#headline').text()&&$('#recommendation div').length<3) $recommendation.append(`<div href="/${n.date.replace(/\//g,'-')}-${n.title.toLowerCase().replace(/ /g,'-').normalize("NFD").replace(/[\u0300-\u036f]/g,'')}"><div style="background-image:url(${n.image})"></div><span>${n.title}</span><span>${n.date}</span></div>`);
            });
            $('#recommendation > div').click(function(){location.href=$(this).attr('href')});
        }

    });

    $('#year').text(new Date().getFullYear());

    $('#logo').click(()=>{
        if($('#head').hasClass('small')) $('html,body').animate({scrollTop:0})
        else location.href='/';
    });

    var scrollBefore = 0;
    onscroll=()=>{
        if(scrollY>scrollBefore && scrollY>78.4) $('#head').addClass('small');
        else $('#head').removeClass('small');
        scrollBefore = scrollY;
    }

});