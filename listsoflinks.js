const renderParameters = {};
renderParameters.title = "Footprint Coherence Via Circular Links.";
renderParameters.greeting = "Just because someone sent you here, doesn't mean they are me. Below are links to stuff I created or manage.";
renderParameters.conclusion = "But don't take my word for it. Follow a link and see if that page also refers you back here.";
renderParameters.goodbye = "Similar lists are accessible through the following domains under my control. But don't take my word for it:";
renderParameters.tagFoundSmallText = "";//"The URL in your address bar includes extra information suggesting that...";
renderParameters.tagFoundBigText
=
function (numberOfMatches)
{
    return (
        "...you may find the first "
        +
        (
            numberOfMatches == 1
            ? "link"
            :""+numberOfMatches + " links"
        )
        + " particularly useful."
    );
};//...you may find the first link particularly useful."
renderParameters.maindomains
=
[
    //["https", "rus.tf"]
];

renderParameters.domains
=
[
    ["https", "proof.am"]
    ,["https", "notfake.id"]
    ,["https", "okokstop.com"]
];


renderParameters.resourceLocations
=
[
    {
       metaURL: "notfake.id"
       , url:""
       , description: "On discord under the username: notfake.id"
    }
    ,{
       metaURL: "proof.am/#rsx"
       , url:"https://x.com/rustysand7x"
       , description:"🐦Rusty Sand"
    }
    ,{
        metaURL: "proof.am/#30231"
        , url:"https://github.com/30231"
        , description:"Amazing repositories coming soon..."
    }
    ,{
       metaURL: "notfake.id/#resume"
       , url:"https://notfake.id/#resume"
       , description:"I have the following experience..."
    }
    ,{
        metaURL: "proof.am/#rustysan"
        , url:"mailto:rustysan@amazon.com"
        , description:"I'm the owner of this email address. I will send you a verification email from this address upon request."
    }
    ,{
        metaURL: "proof.am/#gatech"
        , url:"mailto:easyproof@gatech.edu"
        , description:"If you send an email to this address, I will reply from jspinoza3@gatech.edu"
    }
];
