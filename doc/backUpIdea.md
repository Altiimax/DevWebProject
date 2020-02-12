# DevWeb - backup project

## General idea 
Developing a website where people can create groups/communities in which they can share or rent specific equipment such as :
* Gardening tools
* Electrical tools
* Mechanical tools
* Construction tools
* ...

A group can be as small as a few members a family and as big as an entire city or state.
There can be two types of groupes: 
* __public groups__ : 
  Everyone can see them and ask to join them. 
* __private groups__ :
  The groups are only visible for their members. People can only join on invitation.

> Each group can either be a share group or a rent group. (TO DEVELOP AND ANALYSE DO-ABILITY)

## Client specifications: 
Client : Matthieu Michotte

#####  User types:

* __Visitor__ : Person that doesn't have an account.
* __Member__ : Person that has an account.
* __GroupMember__ : Member that is part of one or multiple groups.
  * __Lender__
  * __Borrower__
* __GroupAdmin__ : GroupMember that can manage the group. 

#### Visitor
1. A visitor can consult a list or a heat-map of all public groups. 
2. A visitor can consult a brief overview of a group such as the available tools.
3. A visitor can create an account to become member.
 
#### Member 
1. A Member can consult a list or a heat-map of all public groups.
2. A Member can ask to join a public group.
3. A Member can accept or deny an invitation to join a public or private group. 
4. A Member can add tools he wants to share/rent to his toolbox  (even though they won"t be visible to anyone)

#### GroupMember 
1. A GroupMember can do everything a Member can do.
2. A groupMember can consult the groups he is in.
3. A groupMember can search for a specific tool.
4. A GroupMember can either manually enter a search location or be geo-localized.
5. A groupMember can narrow the search with multiple filters such as:
   1. A particular group 
   2. Distance from position
   3. Availability
   4. Lender's rating
   5. (Price)
6. A GroupMember can consult a list of the found tools or display them on a heat-map.
7. A GroupMember can consult the specification of a tool and check its availability on a calendar. 
8. A groupMember can create a new group (either public or private).
9. A groupMember can suggest a new groupMember to the GroupAdmin. 

##### Lender
1. Is a GroupMember that lends a tool to a borrower.
2. The Lender can add one of its tools to a specific group and specify :
   1. the maximum duration of the lease 
   2. extra borrow conditions 
   3. (the price/day) 
3. The Lender can rate/write a review on:
   1. the Borrower
 
##### Borrower 
1. Is a GroupMember who lends a tool from a Lender. 
4. The Borrower can rate/write a review on:
   1. the tool's quality
   2. the tool's state
   3. (the tools's price)
   4. the Lender

#### GroupAdmin 
1. A GroupAdmin can do everything a GroupMember can do.
2. A GroupAdmin can accept/deny join request from Members/GroupMembers.
3. A GroupAdmin can accept/deny a GroupMember suggestion.
4. A GroupAdmin can ban people from the group (under certain conditions). 

#### Privacy
1. The website should never give the exact location of a tool but a general area. 
2. All communication should be exclusively done via the website itself (user accounts with integrated message-box)

#### Other specifications
1. The website needs to be simple and clear 
2. The website should not be polluted with companies, only private persons are allowed

 
> Topics that need further discussion with client:
>  * Warrranty on tool ?
>  * Compensate in case of breakage, excessive wear, ... ?
>  * Contract signing between lender and borrower ?