// เพิ่มแบบฟอร์ม
document.getElementById('addButton').addEventListener('click', () => {
    // เลือก timeForm-row ที่เป็น container สำหรับฟอร์ม
    const timeFormRow = document.querySelector('.timeForm-row');
  
    // สร้างฟอร์มใหม่
    const newForm = document.createElement('form');
    newForm.className = 'timeForm';
  
    // ใส่เนื้อหา HTML สำหรับฟอร์มใหม่
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
  
    // เพิ่มฟอร์มใหม่เข้าไปใน timeForm-row
    timeFormRow.appendChild(newForm);
});

// ลบ form
document.querySelector('.timeForm-row').addEventListener('click', (event) => {   
    // ถ้าเจอคลาส removeButton
    if (event.target.classList.contains('removeButton')) {
        event.target.closest('.timeForm').remove(); // ลบฟอร์มที่ปุ่มอยู่
    }
});

//   คำนวณเวลา
document.getElementById('calculateButton').addEventListener('click', () => {
    // เลือก input elements ทั้งหมดใน timeForm-row
    const timeForms = document.querySelectorAll('.timeForm');
  
    // ตัวแปรสำหรับเก็บผลรวม
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;
  
    // วนลูปผ่านแต่ละฟอร์มเพื่อดึงค่าจาก input
    timeForms.forEach(form => {
      const hours = parseInt(form.querySelector('.hours')?.value || 0, 10); // อ่านค่า input ชั่วโมง
      const minutes = parseInt(form.querySelector('.minutes')?.value || 0, 10); // อ่านค่า input นาที
      const seconds = parseInt(form.querySelector('.seconds')?.value || 0, 10); // อ่านค่า input วินาที
  
      totalHours += hours;
      totalMinutes += minutes;
      totalSeconds += seconds;
    });
  
    // ปรับหน่วยถ้านาทีหรือวินาทีเกิน 59
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
  
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  
    // แสดงผลรวมใน HTML
    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalMinutes').textContent = totalMinutes;
    document.getElementById('totalSeconds').textContent = totalSeconds;
  });