/* Script on ready
------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".modal .icon-close, .modal .cancel").forEach(function (element) {
    element.addEventListener("click", function () {
      var bodyClass = document.querySelector("body").getAttribute("class");
      document.querySelector("body").setAttribute("class", "");

      var classArr = bodyClass.split(" ");
      for (var i = 0; i < classArr.length; i++) {
        if (classArr[i].substr(0, 10) !== "open-modal") {
          document.querySelector("body").classList.add(classArr[i]);
        }
      }

      var modalContainer = document.querySelector(".modal .modal-inner .modal-container");
      if (modalContainer.style.transform === "translateY(0px)") {
        modalContainer.style.transform = "translateY(-10px)";
        setTimeout(function () {
          modalContainer.style.transform = "translateY(10px)";
        }, 500);
      }

      var video = document.getElementById("video");
      if (video) {
        video.src = video.src;
      }
    });
  });

  const modals = document.querySelector(".modal");
  if (modals) {
    document.querySelector(".modal").addEventListener("click", function (e) {
      if (!e.target.closest(".modal-container")) {
        var bodyClass = document.querySelector("body").getAttribute("class");
        document.querySelector("body").setAttribute("class", "");

        var classArr = bodyClass.split(" ");
        for (var i = 0; i < classArr.length; i++) {
          if (classArr[i].substr(0, 10) !== "open-modal") {
            document.querySelector("body").classList.add(classArr[i]);
          }
        }

        var modalContainer = document.querySelector(".modal .modal-inner .modal-container");
        if (modalContainer.style.transform === "translateY(0px)") {
          modalContainer.style.transform = "translateY(-10px)";
          setTimeout(function () {
            modalContainer.style.transform = "translateY(10px)";
          }, 500);
        }

        var video = document.getElementById("video");
        video.src = video.src;
      }
    });
  }
  document.querySelector("body").addEventListener("click", function () {
    var body = document.querySelector("body");

    if (body.classList.value.startsWith("open-modal")) {
      var modalContainer = document.querySelector(".modal .modal-inner .modal-container");

      if (modalContainer && modalContainer.style.transform === "translateY(10px)") {
        modalContainer.style.transform = "translateY(0)";
      }
    }
  });

  const heSignUp = document.querySelector("header .link-signup");
  if (heSignUp) {
    document.querySelector("header .link-signup").addEventListener("click", function () {
      document.querySelector("body").classList.add("open-modal-signup");
    });
  }

  var btnSignup = document.querySelector(".dropdown-menu .btn-signup");
  if (btnSignup) {
    btnSignup.addEventListener("click", function () {
      var body = document.querySelector("body");
      var mobileMode = document.querySelector(".mobile-mode");
      var mobileNav = document.querySelector(".mobile-nav");

      if (body && mobileMode && mobileNav) {
        body.classList.remove("no-scroll");
        mobileMode.classList.remove("show");
        mobileNav.classList.remove("open");
        body.classList.add("open-modal-signup");
      }
    });
  }

  const heLogin = document.querySelector("header .link-signin");
  if (heLogin) {
    document.querySelector("header .link-signin").addEventListener("click", function () {
      document.querySelector("body").classList.add("open-modal-login");
    });
  }
  var btnLogin = document.querySelector(".dropdown-menu .btn-login");
  if (btnLogin) {
    btnLogin.addEventListener("click", function () {
      var body = document.querySelector("body");
      var mobileMode = document.querySelector(".mobile-mode");
      var mobileNav = document.querySelector(".mobile-nav");

      if (body && mobileMode && mobileNav) {
        body.classList.remove("no-scroll");
        mobileMode.classList.remove("show");
        mobileNav.classList.remove("open");
        body.classList.add("open-modal-login");
      }
    });
  }

  const modalAccountSignUp = document.querySelector(".modal-account .link-signup");
  if (modalAccountSignUp) {
    document.querySelector(".modal-account .link-signup").addEventListener("click", function () {
      document.querySelector("body").classList.remove("open-modal-login");
      document.querySelector("body").classList.remove("open-modal-pass-saved");
      document.querySelector("body").classList.add("open-modal-signup");
    });
  }
  const modalAccountLogin = document.querySelector(".modal-account .link-login");
  if (modalAccountLogin) {
    document.querySelector(".modal-account .link-login").addEventListener("click", function () {
      document.querySelector("body").classList.remove("open-modal-signup");
      document.querySelector("body").classList.remove("open-modal-pass-reset");
      document.querySelector("body").classList.add("open-modal-login");
    });
  }
  const modalAccountForgotPass = document.querySelector(".modal-account .forgot-password");
  if (modalAccountForgotPass) {
    document
      .querySelector(".modal-account .forgot-password")
      .addEventListener("click", function () {
        document.querySelector("body").classList.remove("open-modal-login");
        document.querySelector("body").classList.remove("open-modal-pass-saved");
        document.querySelector("body").classList.add("open-modal-pass-reset");
      });
  }
  var coursePreview = document.querySelector(".course-listing .course-preview");
  if (coursePreview) {
    coursePreview.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-preview-course");
      }
    });
  }

  var courseImg = document.querySelector(".product-banner .course-img");
  if (courseImg) {
    courseImg.addEventListener("click", function () {
      if (!this.classList.contains("blank")) {
        var body = document.querySelector("body");

        if (body) {
          body.classList.add("open-modal-preview-course");
        }
      }
    });
  }

  var videoReviewFigure = document.querySelector(".product-page .video-review figure");
  if (videoReviewFigure) {
    videoReviewFigure.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-review-video");
      }
    });
  }
  var btnPreview = document.querySelector(".product-page .benefits-block .btn-preview");
  if (btnPreview) {
    btnPreview.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-online-course-preview");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var recommendClick = document.querySelector(".reccomend-click");
    if (recommendClick) {
      recommendClick.addEventListener("click", function () {
        var body = document.querySelector("body");

        if (body) {
          body.classList.add("open-modal-recommend-frnd");
        }
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var btnDownloadWhizCard = document.querySelector(
      ".CSAA-whizCardsBlock .right .btn-downloadWhizCard"
    );
    if (btnDownloadWhizCard) {
      btnDownloadWhizCard.addEventListener("click", function () {
        var body = document.querySelector("body");

        if (body) {
          body.classList.add("open-modal-download-whizcard");
        }
      });
    }
  });

  var videoReviewFigure = document.querySelector(".review-page .video-review figure");
  if (videoReviewFigure) {
    videoReviewFigure.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-review-video");
      }
    });
  }

  var imgBlock = document.querySelector(".review-banner .img-block");
  if (imgBlock) {
    imgBlock.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-review-video");
      }
    });
  }

  var certificateImg = document.querySelector(".review-page .certificate-img");
  if (certificateImg) {
    certificateImg.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-aws-certificate");
      }
    });
  }

  var btnConsultation = document.querySelector(".banner-aws-consulting .btn-consultation");
  if (btnConsultation) {
    btnConsultation.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-request-consultation");
      }
    });
  }

  var certificateFigure = document.querySelector(
    ".dashboard-page .training-page .certificate-block figure"
  );
  if (certificateFigure) {
    certificateFigure.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-certificate");
      }
    });
  }

  var certificateName = document.querySelector(
    ".dashboard-page .training-page .certificate-block .name"
  );
  if (certificateName) {
    certificateName.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-certificate");
      }
    });
  }

  var linkView = document.querySelector(".dashboard-page .acc-setting-page .link-view");
  if (linkView) {
    linkView.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-order-details");
      }
    });
  }

  var btnUpdate = document.querySelector(".dashboard-page .connection-first-page .btn-update");
  if (btnUpdate) {
    btnUpdate.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-change-preference");
      }
    });
  }

  var btnNext = document.querySelector(".dashboard-page .modal-change-preference .btn-next");
  if (btnNext) {
    btnNext.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-update-profile");
        body.classList.remove("open-modal-change-preference");
      }
    });
  }
  var btnBack = document.querySelector(".dashboard-page .modal-update-profile .btn-back");
  if (btnBack) {
    btnBack.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-change-preference");
        body.classList.remove("open-modal-update-profile");
      }
    });
  }

  var changePreference = document.querySelector(
    ".dashboard-page .user-connections .change-preference"
  );
  if (changePreference) {
    changePreference.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-change-preference");
      }
    });
  }

  var reportMoreDetails = document.querySelector(
    ".dashboard-page .user-connections .more-details .report"
  );
  if (reportMoreDetails) {
    reportMoreDetails.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-report");
      }
    });
  }

  var reportChatBox = document.querySelector(".dashboard-page .chat-box .report");
  if (reportChatBox) {
    reportChatBox.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-report");
      }
    });
  }

  var blockedLink = document.querySelector(".modal-report .report-content .blocked-link");
  if (blockedLink) {
    blockedLink.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-person-blocked");
        body.classList.remove("open-modal-report");
      }
    });
  }
  var reportProfileLink = document.querySelector(
    ".modal-report .report-content .report-profile-link"
  );
  if (reportProfileLink) {
    reportProfileLink.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-report-profile");
        body.classList.remove("open-modal-report");
      }
    });
  }

  var btnBackBlocked = document.querySelector(".modal-person-blocked .modal-footer .btn-back");
  if (btnBackBlocked) {
    btnBackBlocked.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.remove("open-modal-person-blocked");
        body.classList.add("open-modal-report");
      }
    });
  }

  var btnBackReportProfile = document.querySelector(
    ".modal-report-profile .modal-footer .btn-back"
  );
  if (btnBackReportProfile) {
    btnBackReportProfile.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.remove("open-modal-report-profile");
        body.classList.add("open-modal-report");
      }
    });
  }

  var btnWithdrawEarnings = document.querySelector(".dashboard-page .wallet-page .btn-withdraw");
  if (btnWithdrawEarnings) {
    btnWithdrawEarnings.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-withdrow-earnings");
      }
    });
  }
  var submitButton = document.querySelector(".modal-auto-renew button.submit");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.remove("open-modal-auto-renew");

        document
          .querySelectorAll(".dashboard-subscription .renewCancel-block .toggle-btn input:checked")
          .forEach(function (input) {
            input.removeAttribute("checked");
          });

        document
          .querySelector(".dashboard-subscription .renewCancel-block .toggle-btn")
          .classList.add("desabled");

        var modalContainer = document.querySelector(".modal .modal-inner .modal-container");
        modalContainer.style.transform = "translateY(-10px)";
        setTimeout(function () {
          modalContainer.style.transform = "translateY(10px)";
        }, 500);
      }
    });
  }

  var cancelSubscriptionButton = document.querySelector(
    ".dashboard-subscription .btn-cancelSubscription"
  );
  if (cancelSubscriptionButton) {
    cancelSubscriptionButton.addEventListener("click", function () {
      var body = document.querySelector("body");

      if (body) {
        body.classList.add("open-modal-cancel-subscription");
      }
    });
  }

  /* ------ End Modal Scripts ------ */

  //---- cookies msg close script ----//

  var cookiesMsg = document.querySelector(".cookies-msg");
  if (cookiesMsg) {
    cookiesMsg.classList.add("open");
  }

  var cookiesMsg = document.querySelector(".cookies-msg");
  if (cookiesMsg) {
    cookiesMsg.classList.add("close");
    cookiesMsg.classList.remove("open");
  }
  //---- End cookies msg close script ----//
  var btnClose = document.querySelector(".subscription-banner .btn-close");
  if (btnClose) {
    btnClose.addEventListener("click", function () {
      var subscriptionBanner = document.querySelector(".subscription-banner");
      if (subscriptionBanner) {
        subscriptionBanner.style.opacity = 0;
        setTimeout(function () {
          subscriptionBanner.style.display = "none";
        }, 300);
      }
    });
  }

  /* ------ Category page Scripts ------ */
  var btnFilter = document.querySelector(".category-page .course-listing .btn-filter");
  if (btnFilter) {
    btnFilter.addEventListener("click", function () {
      document.querySelector(".category-page .two-column .left-column").classList.add("show");
      document
        .querySelector(".category-page .two-column .right-part")
        .classList.add("overlay-show");
    });
  }

  var iconClose = document.querySelector(".category-page .filter-bar .icon-close");
  if (iconClose) {
    iconClose.addEventListener("click", function () {
      document.querySelector(".category-page .two-column .left-column").classList.remove("show");
      document
        .querySelector(".category-page .two-column .right-part")
        .classList.remove("overlay-show");
    });
  }

  const filter = document.querySelectorAll(".filter-bar, .btn-filter");

  const wrapper = document.querySelector("#wrapper");
  if (wrapper) {
    document.querySelector("#wrapper").addEventListener("click", function (e) {
      if (filter.length === 2 && !filter[0].contains(e.target) && !filter[1].contains(e.target)) {
        document.querySelector(".category-page .two-column .left-column").classList.remove("show");
        document
          .querySelector(".category-page .two-column .right-part")
          .classList.remove("overlay-show");
      }
    });
  }
  var filterItems = document.querySelectorAll(".category-page .filter-bar .item");
  if (filterItems.length > 0) {
    var firstFilterItem = filterItems[0];
    firstFilterItem.classList.add("open");

    if (firstFilterItem.classList.contains("open")) {
      var itemContent = firstFilterItem.querySelector(".item-content");
      if (itemContent) {
        itemContent.style.display = "block";
      }
    }
  }

  var filterNames = document.querySelectorAll(".category-page .filter-bar .filter-name");
  if (filterNames.length > 0) {
    filterNames.forEach(function (element) {
      element.addEventListener("click", function (event) {
        var parentItem = element.parentNode;
        if (parentItem) {
          parentItem.classList.toggle("open");

          var nextElementSibling = element.nextElementSibling;
          if (nextElementSibling) {
            if (parentItem.classList.contains("open")) {
              nextElementSibling.style.display = "block";
            } else {
              nextElementSibling.style.display = "none";
            }
          }
        }
      });
    });
  }

  var accordianList = document.querySelector(".accordian-block .accordian-list");
  if (accordianList) {
    accordianList.addEventListener("click", function (event) {
      if (event.target.classList.contains("item-head")) {
        if (event.target.classList.contains("open")) {
          event.target.classList.remove("open");
          var itemContent = event.target.nextElementSibling;
          if (itemContent) {
            itemContent.style.display = "none";
          }
        } else {
          event.target.classList.add("open");
          var itemContent = event.target.nextElementSibling;
          if (itemContent) {
            itemContent.style.display = "block";

            var siblings = event.target.parentElement.parentElement.children;
            Array.from(siblings).forEach(function (sibling) {
              if (sibling !== event.target.parentElement) {
                var siblingHead = sibling.querySelector(".item-head");
                var siblingContent = sibling.querySelector(".item-content");
                if (siblingHead && siblingContent) {
                  siblingHead.classList.remove("open");
                  siblingContent.style.display = "none";
                }
              }
            });
          }
        }
      }
    });
  }

  /* ------ End Category page Scripts ------ */

  /* ------ Product page Scripts ------ */
  var iconClose = document.querySelector(".msg-box .icon-close");
  if (iconClose) {
    iconClose.addEventListener("click", function () {
      var body = document.querySelector("body");
      if (body) {
        body.classList.remove("open-success-msg");
        body.classList.remove("open-error-msg");
        body.classList.remove("open-alert-msg");
      }
    });
  }

  var addWishlist = document.querySelector(".add-whishlist");
  if (addWishlist) {
    addWishlist.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

  var trainingOptionsInputs = document.querySelectorAll(".training-options .option input");
  if (trainingOptionsInputs.length > 0) {
    trainingOptionsInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        var index = Array.from(this.closest(".option").parentElement.children).indexOf(
          this.closest(".option")
        );

        if (this.checked) {
          this.closest(".option").classList.add("active");

          var sidebarOption = document.querySelectorAll("#sidebar .option")[index];
          if (sidebarOption) {
            sidebarOption.classList.add("active");

            var sidebarOptionInput = sidebarOption.querySelector("input");
            if (sidebarOptionInput) {
              sidebarOptionInput.click();
            }
          }
        } else {
          this.closest(".option").classList.remove("active");

          var sidebarOption = document.querySelectorAll("#sidebar .option")[index];
          if (sidebarOption) {
            sidebarOption.classList.remove("active");

            var sidebarOptionInput = sidebarOption.querySelector("input");
            if (sidebarOptionInput) {
              sidebarOptionInput.click();
            }
          }
        }
      });
    });
  }

  var sidebarInputs = document.querySelectorAll("#sidebar .option input");
  if (sidebarInputs.length > 0) {
    sidebarInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        var index = Array.from(this.closest(".option").parentElement.children).indexOf(
          this.closest(".option")
        );

        if (this.checked) {
          this.closest(".option").classList.add("active");

          var trainingOption = document.querySelectorAll(".training-options .option")[index];
          if (trainingOption) {
            trainingOption.classList.add("active");

            var trainingOptionInput = trainingOption.querySelector("input");
            if (trainingOptionInput) {
              trainingOptionInput.click();
            }
          }
        } else {
          this.closest(".option").classList.remove("active");

          var trainingOption = document.querySelectorAll(".training-options .option")[index];
          if (trainingOption) {
            trainingOption.classList.remove("active");

            var trainingOptionInput = trainingOption.querySelector("input");
            if (trainingOptionInput) {
              trainingOptionInput.click();
            }
          }
        }
      });
    });
  }
  var header = document.querySelector("header");
  if (header) {
    var headerHeight = header.offsetHeight;
  }

  var scrollNav = document.querySelector(".scroll-nav");
  if (scrollNav) {
    var scrollNavHeight = scrollNav.offsetHeight;
  }

  var sidebar = document.querySelector("#sidebar");
  if (sidebar) {
    new StickySidebar("#sidebar", {
      topSpacing: headerHeight + scrollNavHeight + 10,
    });
  }

  /* ------ End Product page Scripts ------ */

  /* ------ checkout page Scripts ------ */
  document.querySelectorAll(".checkout-page .payment-card li").forEach(function (element) {
    element.addEventListener("click", function () {
      if (element.classList.contains("active")) {
        document.querySelectorAll(".payment-info .tab").forEach(function (tab) {
          tab.classList.remove("current");
        });
      } else {
        element.classList.add("active");
        element.parentElement.querySelectorAll("li").forEach(function (sibling) {
          if (sibling !== element) {
            sibling.classList.remove("active");
          }
        });
        document.querySelectorAll(".payment-info .tab").forEach(function (tab) {
          tab.classList.add("current");
        });
      }

      var tabId = element.getAttribute("data-target");
      var tab = document.getElementById(tabId);
      if (tab) {
        tab.classList.add("current");
      }
    });
  });

  var cardNumberInput = document.querySelector(".checkout-page #cardNumber");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      var val = this.value;
      var newval = "";
      val = val.replace(/\s/g, "");
      for (var i = 0; i < val.length; i++) {
        if (i % 4 === 0 && i > 0) {
          newval = newval.concat(" ");
        }
        newval = newval.concat(val[i]);
      }
      this.value = newval;
    });
  }

  /* ------ End checkout page Scripts ------ */

  /* ------ review page Scripts ------ */
  var totalComments = document.querySelector(".students-review-block .total-comments");
  if (totalComments) {
    totalComments.addEventListener("click", function () {
      var reviewContent = this.closest(".review-content");
      if (reviewContent) {
        var commentSection = reviewContent.querySelector(".comment-section");
        if (commentSection) {
          commentSection.classList.toggle("active");
        }
      }
    });
  }

  var reviewFilterItems = document.querySelectorAll(".review-page .review-filter ul li");
  if (reviewFilterItems.length > 0) {
    reviewFilterItems.forEach(function (element) {
      element.addEventListener("click", function () {
        element.classList.add("active");

        element.parentElement.querySelectorAll("li").forEach(function (sibling) {
          if (sibling !== element) {
            sibling.classList.remove("active");
          }
        });
      });
    });
  }

  var reviewPostIcons = document.querySelectorAll(".review-page .review-post .icon-thumb");
  if (reviewPostIcons.length > 0) {
    reviewPostIcons.forEach(function (element) {
      element.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });
  }

  var x, i, j, selElmnt, a, b, c;

  /* Look for any elements with the class "custom-selectbox": */
  x = document.getElementsByClassName("custom-selectbox");

  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];

    if (selElmnt) {
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);

      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");

      for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
              create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box
                  and the selected item: */
          var y, k, s, h;

          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;

          for (k = 0; k < s.length; k++) {
            if (s.options[k].innerHTML == this.innerHTML) {
              s.selectedIndex = k;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");

              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }

              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }

      x[i].appendChild(b);

      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
              and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }

  /* Close the select box when clicking outside of it */
  document.addEventListener("click", closeAllSelect);

  function closeAllSelect(elmnt) {
    var x,
      y,
      i,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");

    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }

    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("select-selected")) {
      closeAllSelect(null);
    }
  });

  /* ------ End review page Scripts ------ */

  /* ------ write a review page Scripts ------ */
  var fileInput = document.querySelector('.drag-form input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      var dropzone = document.getElementById("dropzone");
      if (dropzone && dropzone.files.length > 0) {
        var fileName = e.target.files[0].name;

        var fileSpan = document.querySelector(".upload-block .min-requirement .file-name span");
        if (fileSpan) {
          fileSpan.textContent = fileName;
        }

        var fileIcon = document.querySelector(".upload-block .min-requirement .file-name .icon");
        if (fileIcon) {
          fileIcon.style.opacity = "1";
        }

        var fileUploadBlock = document.querySelector(
          ".how-work-block .upload-block .min-requirement"
        );
        if (fileUploadBlock) {
          fileUploadBlock.style.display = "block";
        }
      }
    });
  }

  /* ------ End write a review page Scripts ------ */

  var closeButton = document.querySelector(".dashboard-menu .btn-close");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      var dashboardMenu = document.querySelector(".dashboard-menu");
      if (dashboardMenu) {
        dashboardMenu.classList.remove("open");
      }

      document.body.classList.remove("no-scroll");

      var mobileMode = document.querySelector(".mobile-mode");
      if (mobileMode) {
        mobileMode.classList.remove("show");
      }
    });
  }

  document
    .querySelectorAll(".dashboard-menu .accordian-list > ul > li span")
    .forEach(function (element) {
      element.addEventListener("click", function () {
        this.parentElement.classList.toggle("open");
        this.parentElement.querySelectorAll(".sub-links").forEach(function (subLink) {
          subLink.style.display = subLink.style.display === "none" ? "block" : "none";
        });

        this.parentElement.querySelectorAll("li").forEach(function (sibling) {
          if (sibling !== this.parentElement) {
            sibling.classList.remove("open");
            sibling.querySelectorAll(".sub-links").forEach(function (subLink) {
              subLink.style.display = "none";
            });
          }
        });
      });
    });

  var filterOptions = document.querySelector(".dashboard-page .filter-options");
  if (filterOptions) {
    filterOptions.style.display = "none";

    document.querySelector(".dashboard-page .filter-block").addEventListener("click", function () {
      filterOptions.style.display = filterOptions.style.display === "none" ? "block" : "none";
    });
  }

  var heartIcons = document.querySelectorAll(".dashboard-page .couser-img .icon-font-heart");

  if (heartIcons.length > 0) {
    heartIcons.forEach(function (element) {
      element.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    });
  }

  /* ------ End Dashboard Account page Scripts ------ */

  /* ------ Dashboard Connections page Scripts ----------*/
  var inputBoxGroup = document.querySelector(".modal-change-preference .input-box-group");
  if (inputBoxGroup) {
    inputBoxGroup.style.display = "none";
  }
  var anyUserElement = document.querySelector(".modal-change-preference .anyuser");
  if (anyUserElement) {
    anyUserElement.classList.add("active");
  }

  var anyUserElement = document.querySelector(".modal-change-preference .anyuser");
  if (anyUserElement) {
    anyUserElement.addEventListener("click", function () {
      this.classList.add("active");
      var userFromElement = document.querySelector(".modal-change-preference .userfrom");
      if (userFromElement) {
        userFromElement.classList.remove("active");
      }

      if (this.classList.contains("active")) {
        var inputBoxGroup = document.querySelector(".modal-change-preference .input-box-group");
        if (inputBoxGroup) {
          inputBoxGroup.style.display = "none";
        }
      }
    });
  }
  var userFromElement = document.querySelector(".modal-change-preference .userfrom");
  if (userFromElement) {
    userFromElement.addEventListener("click", function () {
      this.classList.add("active");
      var anyUserElement = document.querySelector(".modal-change-preference .anyuser");
      if (anyUserElement) {
        anyUserElement.classList.remove("active");
      }

      if (this.classList.contains("active")) {
        var inputBoxGroup = document.querySelector(".modal-change-preference .input-box-group");
        if (inputBoxGroup) {
          inputBoxGroup.style.display = "block";
        }
      }
    });
  }

  var contactListItems = document.querySelectorAll(
    ".dashboard-page .chat-sidebar .contact-list .item"
  );
  if (contactListItems) {
    contactListItems.forEach(function (element) {
      element.addEventListener("click", function () {
        this.classList.add("active");

        function removeActiveFromSiblings(elem) {
          var siblings = Array.from(elem.parentElement.children);
          siblings.forEach(function (sibling) {
            if (sibling !== elem) {
              sibling.classList.remove("active");
            }
          });
        }

        removeActiveFromSiblings(this);

        if (window.innerWidth < 641) {
          window.setTimeout(function () {
            document.body.style.overflow = "hidden";
          }, 300);

          var chatBox = document.querySelector(".dashboard-page .chat-box");
          if (chatBox) {
            chatBox.classList.add("open");
            var btnBack = chatBox.querySelector(".btn-back");
            if (btnBack) {
              btnBack.addEventListener("click", function () {
                this.closest(".chat-box").classList.remove("open");
                document.body.style.overflow = "auto";
              });
            }
          }
        }
      });
    });
  }

  /* ------ End  Dashboard Connections page Scripts ------ */

  var toggleElements = document.querySelectorAll(".choose-plans .toggle span");
  if (toggleElements) {
    toggleElements.forEach(function (element) {
      element.addEventListener("click", function () {
        this.classList.add("active");

        function removeActiveFromSiblings(elem) {
          var siblings = Array.from(elem.parentElement.children);
          siblings.forEach(function (sibling) {
            if (sibling !== elem) {
              sibling.classList.remove("active");
            }
          });
        }

        removeActiveFromSiblings(this);

        var blockGroup = document.querySelector(".block-group");
        if (blockGroup) {
          blockGroup.classList.add("monthly-plan");
          blockGroup.classList.remove("yearly-plan");
        }
      });
    });
  }

  var toggleLabels = document.querySelectorAll(".choose-plans .toggle label");

  if (toggleLabels) {
    toggleLabels.forEach(function (element) {
      element.addEventListener("click", function () {
        this.classList.add("active");

        function removeActiveFromSiblings(elem) {
          var siblings = Array.from(elem.parentElement.children);
          siblings.forEach(function (sibling) {
            if (sibling !== elem) {
              sibling.classList.remove("active");
            }
          });
        }

        removeActiveFromSiblings(this);

        var blockGroup = document.querySelector(".block-group");
        if (blockGroup) {
          blockGroup.classList.add("yearly-plan");
          blockGroup.classList.remove("monthly-plan");
        }
      });
    });
  }

  var otherAmountElement = document.querySelector(".modal-withdrow-earnings .other-amount");

  if (otherAmountElement) {
    otherAmountElement.addEventListener("click", function () {
      var amountBox = document.querySelector(".modal-withdrow-earnings .amount-box");
      if (amountBox) {
        amountBox.style.display = "flex";
      }
    });
  }

  var customRadiobuttonElement = document.querySelector(
    ".modal-withdrow-earnings .custom-radiobutton.amount"
  );

  if (customRadiobuttonElement) {
    customRadiobuttonElement.addEventListener("click", function () {
      var amountBox = document.querySelector(".modal-withdrow-earnings .amount-box");
      if (amountBox) {
        amountBox.style.display = "none";
      }
    });
  }
  var paypalOptions = document.querySelectorAll(
    ".modal-withdrow-earnings .payment-options .option.paypal"
  );

  paypalOptions.forEach(function (element) {
    element.addEventListener("click", function () {
      var inputBoxGroup = this.querySelector(".input-box-group");
      if (inputBoxGroup) {
        inputBoxGroup.style.display = "flex";
      }

      var siblings = Array.from(this.parentElement.children).filter(function (sibling) {
        return sibling !== element;
      });
      siblings.forEach(function (sibling) {
        var siblingInputBoxGroup = sibling.querySelector(".input-box-group");
        if (siblingInputBoxGroup) {
          siblingInputBoxGroup.style.display = "none";
        }
      });
    });
  });

  var bankOptions = document.querySelectorAll(
    ".modal-withdrow-earnings .payment-options .option.bank"
  );

  bankOptions.forEach(function (element) {
    element.addEventListener("click", function () {
      var inputBoxGroup = this.querySelector(".input-box-group");
      if (inputBoxGroup) {
        inputBoxGroup.style.display = "flex";
      }

      var siblings = Array.from(this.parentElement.children).filter(function (sibling) {
        return sibling !== element;
      });
      siblings.forEach(function (sibling) {
        var siblingInputBoxGroup = sibling.querySelector(".input-box-group");
        if (siblingInputBoxGroup) {
          siblingInputBoxGroup.style.display = "none";
        }
      });
    });
  });

  /* ------ End Dashboard Wallet page Scripts ----------*/

  /* ------ All Resposnive Tabs Scripts ------ */

  /* ------ End Dashboard Connections page Scripts ------ */

  /* ------ carousel slider Scripts ------ */

  //* ------ After Signup-Stepper Scripts in modal-after-signup ------ */
  const nextBtns = document.querySelectorAll(".btnNext");

  const progress = document.getElementById("progress");

  const formSteps = document.querySelectorAll(".formStep");

  let formStepsNum = 0;

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum++;

      updateFormSteps();
    });
  });

  function updateFormSteps() {
    formSteps.forEach((formStep) => {
      formStep.classList.contains("formStep-active") &&
        formStep.classList.remove("formStep-active");
    });

    formSteps[formStepsNum].classList.add("formStep-active");
  }

  /* ------ End carousel slider Scripts ------ */
});
if (document.querySelector(".life-time-membership-page .video-review figure")) {
  document
    .querySelector(".life-time-membership-page .video-review figure")
    .addEventListener("click", function () {
      document.body.classList.add("open-modal-review-video");
    });
}
function toggleDelbox() {
  var elems = document.querySelectorAll(".showSelectItem");
  var shouldShowList = false;

  elems.forEach(function (elem) {
    if (elem.checked) {
      shouldShowList = true;
    }
  });

  document.querySelector("#showSelectTxt").style.display = shouldShowList ? "" : "none";
}
