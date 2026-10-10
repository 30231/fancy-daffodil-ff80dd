function createElementWithTag_Text_andAppendTo_(tag,text,parent)
{
    var e = document.createElement(tag);
   e.innerHTML = text;

   parent.appendChild(e);
   return e;
}

function createLinkWithURL_Tag_Parent_withText_(url,wrapperTag,parent,text)
{
          if(!text) text = url;
           var a = document.createElement("a");
           a.href = url;
           a.innerText = text;
          var wrapper;
          if (wrapperTag)
          {
              wrapper = document.createElement(wrapperTag);
              wrapper.appendChild(a);
           }
          else
               wrapper = a;
           parent.appendChild(wrapper);
           return wrapper;

}






var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML =
`


.center {
  text-align: center;

}

body{
  background-color:black;
}

#greetings,#goodbye,#extrainfo{
  background-color: black;
  color: white;
  font-style: italic;
}

a {
    font-style: normal;
}

.metaurl{
  font-size:small;
}

 #resources, #expander{
    background-color: white;
    color: black;
    font-style: normal;
}

#youmayfind, #beloware, #fullnamediv, #theabove{
  font-size: 50px;
  font-weight: bold;
}



#mynameis, #includesextrainfo{
  font-size:30px;
}

#mynameis, #fullnamediv{
  display:none;
}

.resources{
    overflow: hidden;
}

.resourcelinkwrappingspan{
  border-style: outset;
    border-width: thick;
    padding: 4px;
}

.description{
  font-style: italic;
}


.resources{
  height: 20vh;
}

 #expander{
  height: 8vh;
}

#expander, #expander > button{
  font-size:2.5vh;

}

#expander > button, #expander > div{
  height:3vh;

}


.domainlinkwrapper{
  font-size:35px;
  padding:10px;
}
a:link{

  text-decoration: none;
}
a:visited{

  text-decoration: none;
}
a:hover{

text-decoration: underline;
}
a:active{
text-decoration: underline;
}

.domainlink:link{
  color:cyan;
}
.domainlink:visited{
  color:cyan;
}
.domainlink:hover{
  color:yellow;
}
.domainlink:active{
  color:magenta;
}
.namelisting{

  color:cyan;
  font-style: normal;
}

.resourcelisting0, .resourcelisting1{
  border-style: none none solid none;
  border-color: #bbbbbb;
  font-size: x-large;
}
`;
document.getElementsByTagName('head')[0].appendChild(style);

if (renderParameters.title)
  document.title = renderParameters.title;

var center = document.createElement("div");
center.className = 'center';
document.body.appendChild(center);
var greetingdiv = document.createElement("div");
greetingdiv.id = "greetings"
center.appendChild(greetingdiv);
var h2;





function createNameListingFromProtocol_Domain_andAppendTo_(protocol, domain,parent)
{
   var div = createElementWithTag_Text_andAppendTo_("div", domain.replaceAll(".","dot").toUpperCase() ,parent);
  var a = createLinkWithURL_Tag_Parent_withText_
  (  protocol + "://" + domain
    ,""
    ,div
    , " " + domain //" ( " +domain+" )"
  );
  a.className = "domainlink";

  div.className = "namelisting";
}

var belowarediv = createElementWithTag_Text_andAppendTo_("div", renderParameters.title + "<br><br>" + renderParameters.greeting  + "<br><br>" + renderParameters.conclusion + "<br>" ,greetingdiv);
 belowarediv.id = "beloware";

// Metaurl is "domain" or "domain/#tag". A match is an exact domain and hashtag
// pair. No hashtag on both sides is a match. The resource url is not compared.
function parseMetaurl(metaurl)
{
    var lower = String(metaurl).toLowerCase();
    var splitAt = lower.indexOf("/#");
    if (splitAt < 0)
        return { domain: lower, tag: "" };
    return { domain: lower.slice(0, splitAt), tag: lower.slice(splitAt + 2) };
}

function addressBar()
{
    var hash = location.hash;
    var tag = "";
    if (hash && hash !== "#")
        tag = decodeURIComponent(hash.slice(1)).trim().toLowerCase();
    return { domain: location.hostname.toLowerCase(), tag: tag };
}

var here = addressBar();
var matches = [];
var sameDomain = [];
var otherDomain = [];
for (var item of renderParameters.resourceLocations)
{
    var parsed = parseMetaurl(item.metaURL);
    var entry = { metaurl: item.metaURL, resource: item, parsed: parsed };
    if (parsed.domain === here.domain && parsed.tag === here.tag)
        matches.push(entry);
    else if (parsed.domain === here.domain)
        sameDomain.push(entry);
    else
        otherDomain.push(entry);
}

var extrainfodiv = document.createElement("div");
center.appendChild(extrainfodiv);
extrainfodiv.className = "extrainfo";
extrainfodiv.id = "extrainfo";
var resourcesdiv = document.createElement("div");
center.appendChild(resourcesdiv);
resourcesdiv.className = "resources";
resourcesdiv.id = "resources";

var expander = document.createElement("div");
expander.id="expander";
expander.addEventListener
(
  "click"
  , (e) =>
    {
      resourcesdiv.className = "resourcesexpanded";
      expander.hidden = true;

    }
);

createElementWithTag_Text_andAppendTo_("div","...",expander);
createElementWithTag_Text_andAppendTo_("button","expand list",expander);
center.appendChild(expander);

var goodbye = document.createElement("div");
goodbye.className = "goodbye";
goodbye.id = "goodbye";
center.appendChild(goodbye);

const resourceRenderer
=
{
   rendered : {}
  ,render(metaurl,resource,highlight)
  {
    var url = resource.url
    if (!this.rendered[url] || !url)
    {
      this.rendered[url]=true;
      var div = document.createElement("div");
      resourcesdiv.appendChild(div);
      createElementWithTag_Text_andAppendTo_("p",metaurl,div).className="metaurl";
      var span = document.createElement("span");
      span.className = "resourcelinkwrappingspan";
      if (resource.nonclickable)
      {
        span.textContent = url;
      }
      else
      {
        var a = document.createElement("a");
        a.href = url;
        a.innerText = url;
        a.className = "resourcelink";
        span.appendChild(a);
      }
      div.appendChild(span);
      div.className = Object.keys(this.rendered).length%2?"resourcelisting1":"resourcelisting0";
      if(highlight)
        div.classList.add("my-class");
      createElementWithTag_Text_andAppendTo_("p",resource.description||"",div).className="description";
    }
  }
};

var matchCount = matches.length;
if(matchCount>0)
{
   createElementWithTag_Text_andAppendTo_
   (
       "div"
       ,  renderParameters.tagFoundSmallText
      ,extrainfodiv
  ).id = "includesextrainfo";

  createElementWithTag_Text_andAppendTo_
  (
       "div"
      , renderParameters.tagFoundBigText(matchCount)
      , extrainfodiv
  ).id = "youmayfind";

  for (var match of matches)
  {
    resourceRenderer.render(match.metaurl , match.resource, true);
  }
}

  const urlParams = new URLSearchParams(window.location.search);
  const hideExtras = urlParams.get('hideExtras') !== null ;
  if (!hideExtras)
  {
      for (var entry of sameDomain.concat(otherDomain))
      {
          resourceRenderer.render(entry.metaurl , entry.resource);
      }
  }
   createElementWithTag_Text_andAppendTo_("div", renderParameters.goodbye, goodbye).id="theabove";
 var allDomains = renderParameters.maindomains.concat(renderParameters.domains);
 var currentDomains = allDomains.filter(e=>e[1].toLowerCase()===here.domain);
 var unMatchedDomains = allDomains.filter(e=>e[1].toLowerCase()!==here.domain);
  for (d of hideExtras ? (matchCount ? currentDomains : []) : currentDomains.concat(unMatchedDomains))
  {
    var div
    = createLinkWithURL_Tag_Parent_withText_
    (  d[0] + "://" + d[1]
      ,"div"
      ,goodbye
      ,  d[1]
    )
    ;
    div.className = "domainlinkwrapper";
    div.getElementsByTagName("a")[0].className = "domainlink";
  }
