$(document).ready(function() {
    $('input[name=rowSelect]').click(function() {
        var row =  $(this).parent().parent().html();
        var id = row.split("<td>")[1].split("</td>")[0];
        var name = row.split("<td>")[2].split("</td>")[0];
  
        $('.selected').removeClass('selected');
        $(this).addClass('selected');

        $('.selected-name').text("Name: "+name);
        $('.selected-name').val(name);
        $('.selected-id').text("Id: "+id);
        $('.selected-id').val(id);
        $('.hide').removeClass('hide');
        $('.visible').addClass('hide-permanent');
        $('.visible').removeClass('visible');
        

    });
  });