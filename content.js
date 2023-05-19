function addUploadButton(textarea) {
  let input = document.createElement("input");
  input.type = "file";
  input.id = "actual-btn";
  input.hidden = true;
  input.multiple = true;

  let label = document.createElement("label");
  label.for = "actual-btn";
  label.textContent = "Upload File(s)";
  label.style.backgroundColor = "darkred";
  label.style.color = "white";
  label.style.padding = "0.5rem";
  label.style.borderRadius = "0.3rem";
  label.style.cursor = "pointer";
  label.style.position = "fixed";
  label.style.top = "5px";
  label.style.right = "15px";

  label.addEventListener("click", function () {
    input.click();
  });

  input.addEventListener(
    "change",
    function (e) {
      let files = e.target.files;
      if (!files || files.length === 0) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();
        reader.onload = function (e) {
          let contents = e.target.result;
          textarea.value += contents + "\n";

          let button = document.querySelector(
            ".absolute.p-1.rounded-md.text-gray-500"
          );

          if (button) {
            button.disabled = false;
            button.classList.remove("disabled");
          }
        };
        reader.readAsText(file);
      }
    },
    false
  );

  document.body.appendChild(input);
  document.body.appendChild(label);
}

let observer = new MutationObserver(function () {
  let textarea = document.getElementById("prompt-textarea");
  if (textarea) {
    addUploadButton(textarea);
    observer.disconnect();
  }
});

observer.observe(document, { childList: true, subtree: true });
