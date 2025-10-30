// เมื่อโหลดหน้าเว็บ -> โฟกัสไปที่ช่อง "นาที" ของฟอร์มแรก
window.addEventListener("DOMContentLoaded", () => {
  const firstMinuteInput = document.querySelector(".timeForm .minutes");
  if (firstMinuteInput) firstMinuteInput.focus();
});

// เพิ่มแบบฟอร์ม
document.getElementById("addButton").addEventListener("click", () => {
  const timeFormRow = document.querySelector(".timeForm-row");

  // สร้างฟอร์มใหม่
  const newForm = document.createElement("form");
  newForm.className = "timeForm";
  newForm.innerHTML = `
    <label>
      ชั่วโมง:
      <input type="number" class="hours" min="0" value="">
    </label>
    <label>
      นาที:
      <input type="number" class="minutes" min="0" max="59" value="">
    </label>
    <label>
      วินาที:
      <input type="number" class="seconds" min="0" max="59" value="">
    </label>
    <button type="button" class="removeButton">X</button>
  `;

  // เพิ่มฟอร์มใหม่เข้าไปใน container
  timeFormRow.appendChild(newForm);

  // ลบค่าภายใน input ทั้งหมดเพื่อความชัวร์ (กันค่าติดจาก keydown เดิม)
  newForm.querySelectorAll("input").forEach((input) => (input.value = ""));

  // โฟกัสไปที่ช่อง "นาที" ของฟอร์มที่เพิ่มใหม่
  const newMinuteInput = newForm.querySelector(".minutes");
  if (newMinuteInput) newMinuteInput.focus();
});

// ลบ form
document.querySelector(".timeForm-row").addEventListener("click", (event) => {
  if (event.target.classList.contains("removeButton")) {
    event.target.closest(".timeForm").remove();
  }
});

// คำนวณเวลา
document.getElementById("calculateButton").addEventListener("click", () => {
  const timeForms = document.querySelectorAll(".timeForm");
  let totalHours = 0,
    totalMinutes = 0,
    totalSeconds = 0;

  timeForms.forEach((form) => {
    const hours = parseInt(form.querySelector(".hours")?.value || 0, 10);
    const minutes = parseInt(form.querySelector(".minutes")?.value || 0, 10);
    const seconds = parseInt(form.querySelector(".seconds")?.value || 0, 10);

    totalHours += hours;
    totalMinutes += minutes;
    totalSeconds += seconds;
  });

  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds %= 60;
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;

  document.getElementById("totalHours").textContent = totalHours;
  document.getElementById("totalMinutes").textContent = totalMinutes;
  document.getElementById("totalSeconds").textContent = totalSeconds;
});

// ควบคุมด้วยคีย์บอร์ด
document.addEventListener("keydown", (event) => {
  const active = document.activeElement; // 1. ป้องกันไม่ให้พิมพ์เครื่องหมาย "+" หรือ "-" ลงในช่อง Input

  if (
    (event.key === "+" || event.key === "-") &&
    active &&
    active.tagName === "INPUT" &&
    active.type === "number"
  ) {
    event.preventDefault();
  } // --- การจัดการคีย์บอร์ดหลัก --- // เมื่อกด "+" ให้เพิ่มฟอร์ม
  if (event.key === "+") {
    document.getElementById("addButton").click();
    return; // ออกจากฟังก์ชัน
  } // Enter = คำนวณเวลา

  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("calculateButton").click();
  } // 2. ลบฟอร์มที่โฟกัสอยู่เมื่อกด "Delete" หรือ "-"

  if (event.key === "Delete" || event.key === "-") {
    if (active && active.tagName === "INPUT") {
      const formToRemove = active.closest(".timeForm"); // เงื่อนไข: ต้องมีฟอร์มมากกว่า 1 ฟอร์มถึงจะลบได้
      if (formToRemove && document.querySelectorAll(".timeForm").length > 1) {
        // ไม่ต้องเรียก event.preventDefault() ซ้ำ เพราะถูกเรียกแล้วที่ด้านบน
        formToRemove.remove(); // โฟกัสไปที่ฟอร์มสุดท้าย
        const allForms = document.querySelectorAll(".timeForm");
        if (allForms.length > 0) {
          allForms[allForms.length - 1].querySelector(".minutes")?.focus();
        }
      }
    }
  } // ... (ส่วนการจัดการ ArrowLeft/Right และ ArrowUp/Down ที่เหลือ) // ย้ายโค้ดเดิมที่เหลือมาไว้ที่นี่:

  const inputs = Array.from(document.querySelectorAll('input[type="number"]'));
  const index = inputs.indexOf(active);

  if (index !== -1) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = inputs[index + 1] || inputs[0];
      next.focus();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = inputs[index - 1] || inputs[inputs.length - 1];
      prev.focus();
    }
  }

  if (
    active &&
    (active.classList.contains("hours") ||
      active.classList.contains("minutes") ||
      active.classList.contains("seconds"))
  ) {
    const activeClass = active.classList.contains("hours")
      ? "hours"
      : active.classList.contains("minutes")
      ? "minutes"
      : "seconds";

    const columnInputs = Array.from(
      document.querySelectorAll(`.timeForm .${activeClass}`)
    );
    const currentIndex = columnInputs.indexOf(active);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (nextIndex < columnInputs.length) {
        columnInputs[nextIndex].focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        columnInputs[prevIndex].focus();
      }
    }
  }
});
