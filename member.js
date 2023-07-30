function skillsMember() {
  var member = document.getElementById("member");
  var memberSkills = document.getElementById("member-skills");
  var memberSkillsBtn = document.getElementById("member-skills-btn");
  var memberSkillsClose = document.getElementById("member-skills-close");

  memberSkillsBtn.onclick = function() {
    memberSkills.style.display = "block";
  }

  memberSkillsClose.onclick = function() {
    memberSkills.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == memberSkills) {
      memberSkills.style.display = "none";
    }
  }
}
