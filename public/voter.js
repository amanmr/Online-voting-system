function disableButtons(){
    let status=$('.func').attr('voteStatus')
    if(status==1){
        $('button.thr').prop('disabled', true).css("background-color","#999999")
        $('button.thr').removeClass('hov').css("color","white")
    }
    
}

$(() => {
    disableButtons()
    $('button.thr').click((ev)=>{
        let answer=confirm("Are you sure?")
        if(answer){
        let a=$(ev.target).attr('cid')
        let user=$('.func').attr('id')
        let typeU=$('.type').text()
        $.post('/vote',{
            cid:a,
            uid:user,
            type:typeU
        },(data)=>{
            $('.func').attr('voteStatus','1')
            disableButtons()
            $(ev.target).prev().text(`Votes : ${data.votes}`)
        })
    }
    })


})