const rootstyles = window.getComputedStyle(document.documentElement);

if (
  rootstyles.getPropertyValue("--book-cover-width-large") != null &&
  rootstyles.getPropertyValue("--book-cover-width-large") != " "
) {
  ready();
} else {
  document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
  const coverWidth = parseFloat(
    rootstyles.getPropertyValue("--book-cover-width-large")
  );
  const coverAspectRatio = parseFloat(
    rootstyles.getPropertyValue("--book-cover-aspect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;
  FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImageResize,
    FilePondPluginImagePreview
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
  });

  FilePond.parse(document.body);
}
