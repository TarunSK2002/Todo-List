$(document).ready(function () {
  // Initialize pickadate for due date
  $('#due-date').pickadate({
    format: 'dd-mm-yyyy',
  });

  // Event listener for form submission
  $('#task-form').submit(function (e) {
    e.preventDefault();
    addTask();
  });

  // Function to add a new task
  function addTask() {
    var personName = $('#person-name').val();
    var task = $('#task').val();
    var dueDate = $('#due-date').val();
    var comments = $('#comments').val();
    var status = $('#status').val();

    // Calculate the serial number based on the existing rows
    var serialNumber = $('#task-list tr').length + 1; // Exclude header row

    // Add task to table with serial number
    var row = '<tr>';
    row += '<td>' + (serialNumber > 0 ? serialNumber : 1) + '</td>';
    row += '<td>' + personName + '</td>';
    row += '<td>' + task + '</td>';
    row += '<td>' + dueDate + '</td>';
    row += '<td>' + status + '</td>';
    row += '<td>' + comments + '</td>';
    row += '<td><button class="btn btn-info btn-sm edit-task">Edit</button> <button class="btn btn-danger btn-sm delete-task">Delete</button></td>';
    row += '</tr>';
    $('#task-list').append(row);

    // Clear form fields
    $('#person-name').val('');
    $('#task').val('');
    $('#due-date').val('');
    $('#comments').val('');
    $('#status').val('Open');

    // Apply background color based on status
    var newRow = $('#task-list tr:last');
    if (status === 'In Progress') {
      newRow.addClass('bg-primary text-light');
    } else if (status === 'Finished') {
      newRow.addClass('bg-success');
    }
  }

  // Event listener for editing a task
  $('#task-list').on('click', '.edit-task', function () {
    var row = $(this).closest('tr');
    var statusCell = row.find('td:eq(4)');
    var status = statusCell.text();
    var select = '<select class="form-control">';
    select += '<option value="Open">Open</option>';
    select += '<option value="In Progress">In Progress</option>';
    select += '<option value="Finished">Finished</option>';
    select += '</select>';
    statusCell.html(select);

    // Event listener for changing status
    row.find('select').change(function () {
      var newStatus = $(this).val();
      statusCell.text(newStatus);

      // Apply background color based on status
      row.removeClass('bg-primary text-light bg-success');
      if (newStatus === 'In Progress') {
        row.addClass('bg-primary text-light');
      } else if (newStatus === 'Finished') {
        row.addClass('bg-success');
      }

      // Remove select dropdown after changing status
      $(this).remove();
    });
  });

  // Event listener for deleting a task
  $('#task-list').on('click', '.delete-task', function () {
    $(this).closest('tr').remove();
  });
});


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

let popup= document.getElementById("task-form-container");
function openPopup(){
  popup.classList.add("open-popup");
}
function closePopup(){
  popup.classList.remove("open-popup");
}