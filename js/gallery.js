// JavaScript Document
function onLoadGallery()
{
	"use strict";
	if (typeof pngfix !== "undefined") { 
		pngfix();
	}

	updateBackground(currentImage);	
	loadGallery(1);
}

function onUnloadGallery()
{
	"use strict";
	clearInterval(intervalTimer);
}

function loadGallery(galleryNumber)
{
	"use strict";
	
	var gallery1 = [3, "gallery1",36,469,""];
	var gallery2 = [11,"gallery2",218,650,"Copyright \u00A9 Richard Termine"];
	var gallery3 = [8, "gallery3",53,471,""];
	var gallery4 = [5, "gallery4",38,471,"Copyright \u00A9 Carol Rosegg"];
	var gallery5 = [10,"gallery5",201,634,""];
	var gallery6 = [3, "gallery6",36,469,""];
	var gallery7 = [3, "gallery7",36,469,""];
	var gallery8 = [3, "gallery8",36,469,""];
	var gallery9 = [3, "gallery9",36,469,""];
	var galleries = ["",gallery1,gallery2,gallery3,gallery4,gallery5,gallery6,gallery7,gallery8,gallery9];

	var gallery = galleries[galleryNumber];
	var numberPhotos = gallery[0];
    var imageName;
    var i;

    for (i = 1;i < 10;i++) {
        $("#galleryThumbnails"+i).css("display","none");
    }

	viewer.clear();
	
	for (i = 1;i <= numberPhotos;i++) {
		imageName = "images/" + gallery[1] + "/" + gallery[1] + "-img" + i + ".jpg";
		viewer.add(imageName);
	}

	$("#galleryThumbnails" + galleryNumber).css("display","block");
	$("#galleryLast").css("height",gallery[2] + "px");
	$("#gallery .wrapper").css("height",gallery[3] + "px");
	$("#DivGalleryPhotoCredit").text(gallery[4]);
}
