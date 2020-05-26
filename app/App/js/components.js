const components ={
 chat:`<nav class="main-nav" id="nav">
    
</nav>   
     <section class="chat-container">
    <!-- aside-left -->
    <div class="aside-left">
            <div class="list-conversation">
                
            </div>
            <form class="form-add-conversation">
                <div class="input-wrapper">
                    <input type="text" name="title" placeholder="New Conversation">
                    <div id ="title-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="email" name="friendEmail" placeholder="Your Friend Email">
                    <div id ="friend-email-error" class="message-error"></div>
                </div>
                <!-- <i class="fas fa-acorn"></i> -->
                <button class="btn-icon" type="submit">Add Conversation</button>
            </form>
        </div>
    <div class="current-conversation">
        <div class="list-message-chat">
            
        </div>
        <form class="form-add-message-chat">
            <div class="input-wrapper">
                <input type="text" name="message" placeholder="Enter Your Message...">
            </div>
            <button id="aaa" class="aaa" type="submit">Send</button>
        </form>
    </div>
    <!-- aside-right -->
    <div class="aside-right">
            <div class="details-current-conversation">
                
            </div>
            <div class='btn-leave-conversation-wapper'>
                <button id="btn-leave-conversation" class="btn-icon">
                    Leave
                </button>
            </div>
        </div>
</section>`
}