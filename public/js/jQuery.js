const clipboard = FlowbiteInstances.getInstance("CopyClipboard", "course-url");
const tooltip = FlowbiteInstances.getInstance("Tooltip", "tooltip-course-url");

const $defaultIcon = document.getElementById("default-icon-course-url");
const $successIcon = document.getElementById("success-icon-course-url");

const $defaultTooltipMessage = document.getElementById(
  "default-tooltip-message-course-url"
);
const $successTooltipMessage = document.getElementById(
  "success-tooltip-message-course-url"
);

if (clipboard) {
  clipboard.updateOnCopyCallback((clipboard) => {
    showSuccess();

    // reset to default state
    setTimeout(() => {
      resetToDefault();
    }, 2000);
  });
}

const showSuccess = () => {
  $defaultIcon.classList.add("hidden");
  $successIcon.classList.remove("hidden");
  $defaultTooltipMessage.classList.add("hidden");
  $successTooltipMessage.classList.remove("hidden");
  tooltip.show();
};

const resetToDefault = () => {
  $defaultIcon.classList.remove("hidden");
  $successIcon.classList.add("hidden");
  $defaultTooltipMessage.classList.remove("hidden");
  $successTooltipMessage.classList.add("hidden");
  tooltip.hide();
};
