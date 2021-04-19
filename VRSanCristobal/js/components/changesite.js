AFRAME.registerComponent('hotspots', {
  init: function () {
    this.el.addEventListener('reloadspots', function (evt) {

      //get the entire current spot group and scale it to 0
      var currspotgroup = document.getElementById(evt.detail.currspots);
      currspotgroup.setAttribute("scale", "0 0 0");

      //get the entire new spot group and scale it to 1
      var newspotgroup = document.getElementById(evt.detail.newspots);
      newspotgroup.setAttribute("scale", "1 1 1");
    });
  }
});
AFRAME.registerComponent('spot', {
  schema: {
    linkto: { type: "string", default: "" },
    spotgroup: { type: "string", default: "" },
    img: { default: "", type: "string" },
    sound: { default: "", type: "string" }
  },
  init: function () {
    var data = this.data;

    this.el.addEventListener('click', function () {
      //set the skybox source to the new image as per the spot
      var sky = document.getElementById("skybox");
      sky.setAttribute("src", data.linkto);

      var spotcomp = document.getElementById("spots");
      var currspots = this.parentElement.getAttribute("id");
      //create event for spots component to change the spots data
      spotcomp.emit('reloadspots', { newspots: data.spotgroup, currspots: currspots });

      var mySky = document.querySelector("#skybox");
      mySky.setAttribute("sound", "src", data.sound);
      mySky.setAttribute("material", "src", data.img);

      if (mySky.getAttribute("sounding") == "true") {
        mySky.components.sound.playSound();
        
      }
    });
  }
});

