// Add bubble to the top of the page.
var bubbleDOM = document.createElement("div");
bubbleDOM.setAttribute("class", "selection_bubble");
document.body.appendChild(bubbleDOM);
var hider = document.createElement("div");
hider.setAttribute("class", "hider");

let open = false;
let pasteContent = "";
let top5 = [];
window.addEventListener("load", function() {
    chrome.storage.local.get(["shortcuts"], function(result) {
        let list = result.shortcuts;
        const textField = document
            .getElementsByClassName("ze_area")[0]
            .contentDocument.getElementsByClassName("ze_body")[0];
        textField.addEventListener("keyup", function(e) {
            //console.log(e.key);
            let text = textField.getElementsByTagName("div")[0].innerHTML;
            let xCoord =
                document
                    .getElementsByClassName("ze_area")[0]
                    .getBoundingClientRect().x +
                textField.getElementsByTagName("div")[0].getBoundingClientRect()
                    .x;
            let yCoord =
                document
                    .getElementsByClassName("ze_area")[0]
                    .getBoundingClientRect().y +
                textField.getElementsByTagName("div")[0].getBoundingClientRect()
                    .y;
            if (e.key === "#" && text === "#" && !open) {
                //console.log("opening dropdown");
                open = true;
                renderBubble(xCoord, yCoord, top5);
            } else if (e.key === "Enter" && open && pasteContent !== "") {
                //console.log("Pasting: " + pasteContent);
                textField.getElementsByTagName("div")[0].innerHTML =
                    '<pre><font face="verdana">' +
                    pasteContent +
                    "</font></pre>";
                bubbleDOM.style.visibility = "hidden";
                pasteContent = "";
                open = false;
            } else if (e.key === "Tab" && open) {
                //console.log("closing dropdown");
                open = false;
                bubbleDOM.style.visibility = "hidden";
            } else if (e.code === "Space" && open) {
                //console.log("closing dropdown");
                open = false;
                bubbleDOM.style.visibility = "hidden";
            } else if (text === "<br>" && open) {
                //console.log("closing dropdown");
                open = false;
                bubbleDOM.style.visibility = "hidden";
            } else if (
                text.charAt(0) === "#" &&
                !text.includes('<span style="white-space:pre">	</span>') &&
                !text.includes("&nbsp;")
            ) {
                if (!open) {
                    //console.log("reopening dropdown");
                    open = true;
                }
                //console.log("searching for: " + text.slice(1, text.length));
                let unsorted = list.filter(name => {
                    if (
                        name.key
                            .toLowerCase()
                            .includes(text.slice(1, text.length).toLowerCase())
                    ) {
                        let score = 0;
                        for (let i = 0; i < name.key.length; i++) {
                            if (i < text.slice(1, text.length).length) {
                                if (
                                    text
                                        .slice(1, text.length)
                                        .toLowerCase()
                                        .charAt(i) ===
                                    name.key.toLowerCase().charAt(i)
                                ) {
                                    score++;
                                } else {
                                    score = score - (name.key.length - i);
                                    break;
                                }
                            } else {
                                score = score - (name.key.length - i);
                                break;
                            }
                        }
                        name.score = score;
                        return name;
                    }
                });
                let found = true;
                if (unsorted.length > 0) {
                    const data = unsorted
                        .sort((a, b) => a.score - b.score)
                        .reverse();
                    top5 = data.slice(0, 4);
                    pasteContent = data[0].text;
                } else {
                    found = false;
                    top5 = "No shortcuts found";
                    pasteContent = "";
                }

                renderBubble(xCoord, yCoord, top5, found);
                // chrome.runtime.sendMessage(
                //     chrome.runtime.id,
                //     {
                //         target: "yourshortcuts",
                //         type: "search",
                //         body: text.slice(1, text.length)
                //     },
                //     response => {
                //         if (response.body.length > 0) {
                //             pasteContent = response.body[0].text;
                //             console.log(pasteContent);
                //         } else {
                //             pasteContent = "";
                //         }
                //     }
                // );
            }
        });
    });
});

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection, found) {
    let popup = "<div>";
    if (found) {
        Object.keys(selection).map(i => {
            popup =
                popup +
                "<div><b>" +
                selection[i].key +
                "</b> | " +
                selection[i].text.substr(0, 110) +
                "</div>";
        });
    } else {
        popup = "<div><b>" + selection + "</b></div>";
    }

    popup = popup + "</div>";
    bubbleDOM.innerHTML = popup;
    bubbleDOM.style.top = mouseY + "px";
    bubbleDOM.style.left = mouseX + "px";
    bubbleDOM.style.visibility = "visible";
}
