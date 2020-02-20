# Specifications 

Customer : Matthieu Michotte

## Context
The customer, would like to have a website where people could rent  or share various equipments or tools within a certain group such as :
* Gardening tools
* Electrical tools
* Mechanical tools
* Construction tools
* ...

A group can be as small as a few members of a family and as big as an entire city.

The customer wants the website to have two types of groups: 
* __public groups__ : 
  Everyone can see them and ask to join them.
  The groups are only rent-based.
* __private groups__ :
  The groups are only visible for their members. People can only join on invitation.
  The groups can be share OR rent-based.

The customer's technical requirements: 

1. The website should be as simple and intuitive as possible. (see airbnb)

2. Only private persons can be group-creators or group-members (no company or state-controlled entities are allowed).
  
3. People can only ask to join public groups that are within a certain range (km) of their own town. The range should be automatically adjusted according to the town's population density.  

4. A member can only be in 5 different public groups simultaneously. 

5. The website should only be focused on tools. (not cars, toys, ...)
   
6. Payments is not managed by the website. (maybe later)

7. A user-rating should be included (stars mandatory, comments optional)

8. A pre-made "good-conduct charter" should be available on the website for download

9. (optionnal) Paid membership that gives a certain insurance on the member's tools. 


## Web-application objectives
The objectives pursued by our web-application are : 
* Create a user-friendly application with an easy to use and intuitive interface.
* Make the renting and the borrowing of tools way simpler for particulars.
* Avoid over-consumption of materials. If my neighbor has the tools I need, why should I pay for a new one that I'll use once and then keep forever without purpose "just in case".
* Offer a real sharing experience with my neighborhood and other communities.
* Making contact with people in the same trade and also with DIY people of diverse horizons.

## Web-application utility
The web-application should facilitate contact between people who need particular tools in order to promote the sharing or rental of these tools. More people will therefore have access to tools without having to buy them. 
The web-application is also coherent with the times we live in, where over-consumption and ecology are real problems. 

<div style="page-break-after: always; visibility: hidden"> \pagebreak</div> 

## User stories

#####  User types:

* __Visitor__ : Person that doesn't have an account.
* __Member__ : Person that has an account.
* __GroupMember__ : Member that is part of one or multiple groups.
  * __Lender__
  * __Borrower__
* __GroupAdmin__ : GroupMember that can manage the group. 
> admin website

#### Visitor
1. As a visitor you can consult a list or a heat-map of all public groups to find a group in your area. 
2. As a visitor you can consult a brief overview of a group to get more information about the available tools and amount of members in said group.
3. As a visitor you can create an account to become member.
 
#### Member 
1. As a member you can consult a list or a heat-map of all public groups to find a group  in your area.
2. As a member you can ask to join a public group to be part of the said group.
3. As a member you can accept or deny an invitation to join a public or private group. 
4. As a member you can add tools to your toolbox to be able to share/rent them in a certain group (these tools are not visible to the public outside of a group)

#### GroupMember 
1. As a groupMember you can do everything a Member can do.
2. As a groupMember you can consult the groups you are in to have an overview of said groups.
3. As a groupMember you can search for a specific tool inside a specific group or over all your groups to find someone near you who's renting/sharing it.
4. As a groupMember you can narrow the search to be more precise with multiple filters such as:
   1. A particular group 
   2. Distance from position
   3. Availability
   4. Lender's rating
   5. (Price)
5. As a groupMember you can consult a list of the found tools or display them on a heat-map to have a better overview and choose more easily.
6. As a groupMember you can consult the specification of a tool and check it's availability on a calendar to be able to choose the right tool for the right moment. 
7. As a groupMember you can create a new group (either public or private) to help increase the community and fullfil your needs.
8. As a groupMember you can suggest a new groupMember to the GroupAdmin to help him populate the group with interested people. 

##### Lender
> Is a GroupMember that lends a tool to a borrower.
1. As a lender you can add one of your tools to a specific group and specify :
   1. the maximum duration of the lease 
   2. extra borrow conditions 
   3. (the price/day) 
2. As a lender you can rate/write a review on the Borrower to help others in the making of an opinion on a borrower. 
 
##### Borrower 
> Is a GroupMember who lends a tool from a Lender. 
1. As a borrower you can rate/write a review on:
   1. the tool's quality
   2. the tool's state
   3. (the tools's price)
   4. the Lender

#### GroupAdmin 
1. As a groupAdmin you can do everything a GroupMember can do.
2. As a groupAdmin you can accept/deny join requests from Members/GroupMembers to wisely populate the group.
3. As a groupAdmin you can accept/deny a GroupMember suggestion to wisely populate the group.
4. As a groupAdmin you can ban people from the group (under certain conditions) to prevent bad borrowers or lenders to stay in the group. 

#### Privacy
1. The website should never give the exact location of a tool but a general area. 
2. All communication should be exclusively done via the website itself (user accounts with integrated message-box) but an email should in case of a new message.

#### Other specifications
1. The website needs to be simple and clear 
2. The website should not be polluted with companies, only private persons are allowed
