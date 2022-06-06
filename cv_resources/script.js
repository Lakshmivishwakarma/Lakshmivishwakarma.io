
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
    });
}

// get user name from URL
function getUserNameFromURL(url) {
    let index = url.lastIndexOf("/");
    let userName = url.substring(index + 1);
    return userName;
}

function insertData(data) {
    console.log(data);
    $("#personName").text(data.name);
    $("#objective").text(data.objective);
    $("#email").text(" " + data.email);
    $("#mobile").text(" " + data.phoneNo);

    let githubLink = document.createElement("a");
    githubLink.append(" " + getUserNameFromURL(data.github));
    
    githubLink.setAttribute("href", data.github);
    githubLink.setAttribute("target", "_blank");// sma for target, _blank
    githubLink.style.color = "#fff";
    githubLink.style.textDecoration = "none";
    $("#github").append(githubLink);

    let linkedinLink = document.createElement("a");
    linkedinLink.append(" " + getUserNameFromURL(data.linkedin));
    linkedinLink.setAttribute("href", data.linkedin);
    linkedinLink.setAttribute("target", "_blank");// sma for target, _blank
    linkedinLink.style.color = "#fff";
    linkedinLink.style.textDecoration = "none";
    $("#linkedin").append(linkedinLink);

    $("#location").text(" " + data.city);
    // adding skills by array
    let ul = document.createElement("ul")
    let skills = data.skills;
    // const liArray = [];
    for (let index = 0; index < skills.length; index++) {
        const skill = skills[index];
        const li = document.createElement("li");
        li.append(skill);
        ul.append(li);
    }
    $("#skillsDiv").append(ul);

    //adding tools by for loop
    ul = document.createElement("ul");
    const tools = data.tools;
    // const liArray = [];
    for (let index = 0; index < tools.length; index++) {
        const tool = tools[index];

        const li = document.createElement("li");
        li.append(tool.name);
        ul.append(li);
    }
    $("#toolsDiv").append(ul);
    // adding awards by for loop

    ul = document.createElement("ul");
    const awards = data.awards;
    for (let index = 0; index < awards.length; index++) {
        const award = awards[index];
        const li = document.createElement("li");
        li.append(award);
        ul.append(li);
    }
    $("#awardsDiv").append([ul,]);
    // adding languages by for loop

    let text = data.languages.join(", ");
    $("#languagesDiv").append(text);

    // adding experience

    for (let index = 0; index < data.experiences.length; index++) {
        let exp = data.experiences[index];

        let div = document.createElement("div");

        let nameh5 = document.createElement("h5");
        nameh5.append(exp.organizationName);

        let tenureP = document.createElement("p")
        tenureP.append(formatDate(exp.tenure.from) + " - " + formatDate(exp.tenure.to));

        let roleP = document.createElement("p");
        roleP.append(exp.role);

        div.append(nameh5, tenureP, roleP);
        $("#experienceDiv").append(div);
        console.log(div);
    }

    // adding education
    for (let index = 0; index < data.education.length; index++) {
        let edu = data.education[index];
        let div = document.createElement("div");
        
        let instituteLocation = document.createElement("h5");
        instituteLocation.append(edu.courseName + " - " + edu.instituteName + ", " + edu.location);
        
        let tenureP = document.createElement("p");
        tenureP.append(formatDate(edu.tenure.from) + " - " + formatDate(edu.tenure.to));
        
        div.append(instituteLocation, tenureP);
        $("#education").append(div);
    }

    // adding projects...

    for (let index = 0; index < data.projects.length; index++) {
        const project = data.projects[index];

        let div = document.createElement("div");

        let projectTitle = document.createElement("h5");
        //create a tag 

        let a = document.createElement("a");
        a.append(project.name);

        // append name to a
        // 
        if (project.liveURL) {
            a.setAttribute("href", project.liveURL);
            a.setAttribute("target", "_blank");// sma for target, _blank
        }

        projectTitle.append(a); // append a tag
        
        let technologies = document.createElement("p");
        technologies.append(project.technologies.join(", "));
        
        let features = document.createElement("h6");
        features.append('Features');
        
        ul = document.createElement("ul");
        
        const feature = project.features;
        
        for (let index = 0; index < feature.length; index++) {
            const elm = feature[index];
            const li = document.createElement("li");
            li.append(elm);
            ul.append(li);
        }
        
        div.append(projectTitle, technologies, features, ul);
        $("#projectsDiv").append(div);
    }
}
$(document).ready(function () {
    console.log("ready!");
    // Using the core $.ajax() method
    $.ajax({
        // The URL for the request
        url: "cv_resources/data.json",
        // Whether this is a POST or GET request
        type: "GET",
        // The type of data we expect back
        dataType: "json",
    })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
        .done(function (json) {
            insertData(json);
            // $("<h1>").text(json.title).appendTo("body");
            // $("<div class=\"content\">").html(json.html).appendTo("body");
        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });
    // Code to run regardless of success or failure;
});

