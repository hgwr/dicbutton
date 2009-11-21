// http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/ 
function getFirstElementByXPath(xpath, node) {
  node = node || document;
  var result = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return result.singleNodeValue ? result.singleNodeValue : null;
}

function appendButton(name, value, listener, accessKey) {
  var nb = document.createElement("input");
  nb.type = "button";
  nb.name = name;
  nb.value = value;
  nb.accessKey = accessKey;
  nb.addEventListener("click", listener, true);
  getFirstElementByXPath('//input[@type="submit"]').parentNode.appendChild(nb);
  return nb;
}

function onAlcClicked(e) {
  var q = getFirstElementByXPath('//input[@name="q"]').value;
  location.href = "http://eow.alc.co.jp/" + q + "/UTF-8/";
}

function onYdClicked(e) {
  var q = getFirstElementByXPath('//input[@name="q"]').value;
  location.href = "http://dic.yahoo.co.jp/dsearch?enc=UTF-8&p=" + q + "&stype=0&dtype=2";
}

function onWikipediaClicked(e) {
  var q = getFirstElementByXPath('//input[@name="q"]').value;
  location.href = "http://ja.wikipedia.org/wiki/%E7%89%B9%E5%88%A5:Search?search=" + q;
}

function onWikipediaEnglishClicked(e) {
  var q = getFirstElementByXPath('//input[@name="q"]').value;
  location.href = "http://en.wikipedia.org/wiki/Special:Search?search=" + q;
}

document.addEventListener("DOMContentLoaded",
                          function () {
                            appendButton("alcG", "ALC", onAlcClicked, "a");
                            appendButton("ydG", "Y辞", onYdClicked, "y");
                            appendButton("wikipediaG", "W", onWikipediaClicked, "w");
                            appendButton("wikipediaEnG", "W英", onWikipediaEnglishClicked, "e");

                            // フォーカスが document の外にあっても、 shift + alt + / でフィールドに戻る
                            // getFirstElementByXPath('//input[@name="q"]').accessKey = "/"; でだめだったので、
                            // button を通すようにした。
                            var nb = appendButton("focusG", "", function (e) {
                                                    getFirstElementByXPath('//input[@name="q"]').focus();
                                                  }, "/");
                            nb.style.height = "0px";
                            nb.style.width = "0px";
                            nb.style.border = "0px solid #fff";
                          });
