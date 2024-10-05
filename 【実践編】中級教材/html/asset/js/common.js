var width1 = 0;
var width2 = 0;
var scrollbar_num = 0;

// メニュー開閉時のサイドバー分のズレ対策
function adjustOffset() {
  $("body,#header").css("padding-right", scrollbar_num);
  $("#sp_menu").css("padding-right", scrollbar_num);
  $("#sp_menu_btn").css("margin-right", scrollbar_num);
  $(".p-reserve-btn").css("right", scrollbar_num);
}

$(function () {
  width1 = window.innerWidth;
  width2 = $(window).width();
  scrollbar_num = width1 - width2;

  // ハンバーガーメニュー用JS
  $(".js-sp-menu-btn").on("click", function () {
    $(".js-sp-menu-btn").toggleClass("is-active");
    $("#sp_menu").toggleClass("is_open");
    $("body").toggleClass("is_sp_menu_open");
    if ($("body").hasClass("is_sp_menu_open")) {
      adjustOffset();
    } else {
      $("body,#header,#sp_menu,#sp_menu_btn,.p-reserve-btn").removeAttr(
        "style"
      );
    }
  });

  $("#sp_menu a").on("click", function () {
    $(".js-sp-menu-btn").removeClass("is-active");
    $("#sp_menu").removeClass("is_open");
    $("body").removeClass("is_sp_menu_open");
  });

  // スムーススクロール
  $('a[href^="#"]').on("click", function () {
    let speed = 500;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    let headerHeight = $("#header").height();
    let position = target.offset().top - headerHeight;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
  });

  // 別ページのから遷移したときのスムーススクロール
  const urlHash = location.hash;
  if (urlHash) {
    $("body,html").stop().scrollTop(0);
    setTimeout(function () {
      let headerHeight = $("#header").height();
      const target = $(urlHash);
      const position = target.offset().top - headerHeight;
      $("body,html").stop().animate(
        {
          scrollTop: position,
        },
        500
      );
    }, 1000);
  }

  $(window).on("resize",function () {
    width1 = window.innerWidth;
    width2 = $(window).width();
    scrollbar_num = width1 - width2;
    if ($("body").hasClass("is_sp_menu_open")) {
      adjustOffset();
    }
  });

  $(window).on("scroll",function () {
    //#footerまでスクロールしたら、#page_topにclass="bottom"を付ける／戻ると外す
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    footHeight = $("footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
      $(".p-reserve-btn").addClass("is-bottom");
    } else {
      $(".p-reserve-btn").removeClass("is-bottom");
    }
    // スクロールして、effectクラスの付いた要素が画面内に入ったらactiveクラス付与
    $(".u-effect").each(function () {
      var hit = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var wHeight = $(window).height();
      var customTop = 100;
      if (typeof $(this).data("effect") !== "undefined") {
        // data-effect="任意の値" が設定されている場合
        customTop = $(this).data("effect");
      }
      if (hit + customTop < wHeight + scroll) {
        $(this).addClass("is-active");
      }
    });
  });
});

// ファーストビューの高さをデバイスの高さとそろえる iPhone表示ずれ対策
var OPENING = OPENING || {};
OPENING.VIEW_HEIGHT = {
  init: function () {
    this.setParameters();
    this.setKvHeight();
    this.bind();
  },
  setParameters: function () {
    this.$window = $(window);
    this.$target = $("#first_view");
  },
  bind: function () {
    var _self = this;
    this.$window.on("resize", function () {
      _self.setKvHeight();
    });
  },
  setKvHeight: function () {
    this.$target.css("height", this.$window.height());
  },
};
$(function () {
  OPENING.VIEW_HEIGHT.init();
});
