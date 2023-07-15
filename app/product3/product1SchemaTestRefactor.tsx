import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { doc } from "prettier"

// suppported location groups
// Used to build docTemplate from correct schemas
// Intended to be used to batch closely related locations/countries so the number of genericSchemas can be limited
const locationGroups = {
  locationGroupA: ["location1", "location3"],
  locationGroupB: ["location2"],
}
const allLocations = [
  ...locationGroups.locationGroupA,
  ...locationGroups.locationGroupB,
]

// generic schemas
const genericSchemaA = {
  checkboxExample: {
    true: {
      bodyA: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Natoque penatibus et magnis dis. Adipiscing enim eu turpis egestas pretium aenean. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Dis parturient montes nascetur ridiculus mus mauris vitae. Semper viverra nam libero justo laoreet sit amet cursus sit. Cras adipiscing enim eu turpis egestas pretium. Auctor augue mauris augue neque gravida in fermentum et. Lacinia at quis risus sed. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Dolor magna eget est lorem. Dolor magna eget est lorem ipsum.  Morbi blandit cursus risus at. Mauris a diam maecenas sed enim ut sem viverra aliquet. Vitae semper quis lectus nulla. Rhoncus aenean vel elit scelerisque mauris. Duis at tellus at urna condimentum mattis. Faucibus ornare suspendisse sed nisi lacus sed viverra. Laoreet id donec ultrices tincidunt arcu non sodales neque. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Erat velit scelerisque in dictum non consectetur a erat. Ac tortor dignissim convallis aenean et tortor at risus. Felis eget velit aliquet sagittis id consectetur purus. Mattis aliquam faucibus purus in massa tempor nec. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Facilisis sed odio morbi quis commodo odio. Eget nulla facilisi etiam dignissim diam quis enim. Tincidunt praesent semper feugiat nibh sed. Magna eget est lorem ipsum dolor sit amet. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus.  Blandit turpis cursus in hac habitasse platea dictumst quisque. Blandit aliquam etiam erat velit scelerisque in. Nulla facilisi morbi tempus iaculis urna id volutpat. Nunc aliquet bibendum enim facilisis gravida neque. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Aliquam sem fringilla ut morbi tincidunt.  Mus mauris vitae ultricies leo integer. Risus at ultrices mi tempus. In mollis nunc sed id semper risus in. Nisl pretium fusce id velit. Sagittis purus sit amet volutpat consequat. Neque ornare aenean euismod elementum nisi quis eleifend quam. Morbi non arcu risus quis varius quam quisque id diam. Viverra justo nec ultrices dui sapien eget mi proin. Faucibus interdum posuere lorem ipsum. Magna fermentum iaculis eu non.  Ipsum consequat nisl vel pretium lectus. Quis commodo odio aenean sed adipiscing diam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Interdum posuere lorem ipsum dolor sit. Pretium quam vulputate dignissim suspendisse in. Lorem dolor sed viverra ipsum. Rhoncus urna neque viverra justo. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Vulputate dignissim suspendisse in est ante in nibh mauris. Viverra justo nec ultrices dui sapien. Odio aenean sed adipiscing diam donec adipiscing tristique. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Vestibulum mattis ullamcorper velit sed ullamcorper morbi.  Leo integer malesuada nunc vel risus commodo viverra. Facilisis leo vel fringilla est ullamcorper. Mi ipsum faucibus vitae aliquet nec ullamcorper. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Egestas integer eget aliquet nibh praesent. Condimentum id venenatis a condimentum vitae sapien. Sodales ut etiam sit amet nisl purus. Orci dapibus ultrices in iaculis nunc sed augue lacus. Ultricies tristique nulla aliquet enim tortor. Varius quam quisque id diam vel quam elementum pulvinar etiam. Et netus et malesuada fames ac. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Facilisis volutpat est velit egestas dui id ornare. Euismod in pellentesque massa placerat duis ultricies lacus. Eget felis eget nunc lobortis mattis aliquam faucibus purus in.  Egestas pretium aenean pharetra magna ac placerat vestibulum. Erat velit scelerisque in dictum. Sit amet nisl suscipit adipiscing bibendum est ultricies. Metus vulputate eu scelerisque felis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Pretium viverra suspendisse potenti nullam. Facilisi cras fermentum odio eu feugiat. In eu mi bibendum neque. Mi eget mauris pharetra et. Iaculis eu non diam phasellus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget.  Posuere sollicitudin aliquam ultrices sagittis orci. Dolor purus non enim praesent elementum facilisis. Feugiat in ante metus dictum. Magna eget est lorem ipsum dolor sit. Turpis in eu mi bibendum neque. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Tempor id eu nisl nunc mi ipsum faucibus. Nam at lectus urna duis convallis convallis tellus id. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. Ultrices vitae auctor eu augue. Purus in mollis nunc sed id semper. Morbi tempus iaculis urna id volutpat lacus.  Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Sed libero enim sed faucibus turpis in eu mi bibendum. Magna sit amet purus gravida quis. Nibh sed pulvinar proin gravida hendrerit. Integer eget aliquet nibh praesent tristique. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Neque vitae tempus quam pellentesque nec nam aliquam. Scelerisque purus semper eget duis at tellus. Vestibulum lectus mauris ultrices eros in. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Dictum sit amet justo donec enim. Varius sit amet mattis vulputate enim nulla. Consectetur lorem donec massa sapien faucibus et. Diam donec adipiscing tristique risus nec feugiat in. Cursus euismod quis viverra nibh cras. In hac habitasse platea dictumst quisque sagittis purus sit. Viverra ipsum nunc aliquet bibendum. Turpis massa sed elementum tempus egestas sed. Elit duis tristique sollicitudin nibh sit amet commodo.  Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Nunc eget lorem dolor sed viverra ipsum nunc. Et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Dictum non consectetur a erat nam at lectus urna duis. Non consectetur a erat nam at lectus urna duis. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Amet dictum sit amet justo donec enim diam. In aliquam sem fringilla ut morbi tincidunt augue. Etiam sit amet nisl purus in mollis nunc sed. Sed faucibus turpis in eu mi bibendum neque egestas. In hac habitasse platea dictumst quisque sagittis purus sit. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra.  In ante metus dictum at tempor commodo ullamcorper a. Vel pharetra vel turpis nunc eget lorem. Non odio euismod lacinia at quis risus sed vulputate. Praesent tristique magna sit amet purus gravida quis blandit turpis. Etiam erat velit scelerisque in dictum. Non odio euismod lacinia at. Ac felis donec et odio. Tincidunt lobortis feugiat vivamus at. Lectus quam id leo in vitae turpis massa sed elementum. Vel elit scelerisque mauris pellentesque pulvinar. Pharetra vel turpis nunc eget lorem dolor. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Pulvinar etiam non quam lacus. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Ac tortor dignissim convallis aenean et tortor at risus. Sit amet dictum sit amet justo.  Dictum sit amet justo donec enim. Enim sed faucibus turpis in. Facilisis gravida neque convallis a cras semper auctor neque. Orci porta non pulvinar neque laoreet suspendisse interdum. Nec ultrices dui sapien eget mi proin sed. Nibh ipsum consequat nisl vel. Et molestie ac feugiat sed lectus vestibulum. Sociis natoque penatibus et magnis. Augue eget arcu dictum varius duis at. Ac orci phasellus egestas tellus rutrum tellus. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Nunc congue nisi vitae suscipit. Quisque id diam vel quam elementum pulvinar etiam. Et egestas quis ipsum suspendisse ultrices. Aliquam sem et tortor consequat. At elementum eu facilisis sed odio. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Tellus in metus vulputate eu.  At erat pellentesque adipiscing commodo elit at. Id aliquet risus feugiat in ante metus dictum at. Dui faucibus in ornare quam viverra orci sagittis. Nunc consequat interdum varius sit. Sit amet est placerat in. Dui id ornare arcu odio ut sem nulla. Quisque egestas diam in arcu cursus euismod quis. Tempus imperdiet nulla malesuada pellentesque elit. Quisque non tellus orci ac auctor augue. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Massa placerat duis ultricies lacus sed turpis.  Neque vitae tempus quam pellentesque nec nam aliquam sem et. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Eget dolor morbi non arcu risus quis varius. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Et tortor consequat id porta nibh. Sed pulvinar proin gravida hendrerit lectus. Arcu cursus euismod quis viverra nibh cras pulvinar. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Convallis convallis tellus id interdum velit. Ultricies integer quis auctor elit. Sed odio morbi quis commodo odio aenean sed adipiscing. Purus semper eget duis at tellus at urna. Et malesuada fames ac turpis egestas. Nibh sit amet commodo nulla facilisi nullam.  Iaculis urna id volutpat lacus. Congue eu consequat ac felis donec et odio pellentesque diam. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Dis parturient montes nascetur ridiculus mus. Purus in mollis nunc sed id semper. Arcu ac tortor dignissim convallis aenean. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Pharetra massa massa ultricies mi quis. Nisi quis eleifend quam adipiscing vitae proin sagittis. Aliquet bibendum enim facilisis gravida neque convallis a cras. Tempor nec feugiat nisl pretium fusce id. Quis vel eros donec ac odio tempor orci dapibus ultrices. Sed sed risus pretium quam vulputate dignissim suspendisse. Viverra suspendisse potenti nullam ac tortor vitae purus. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Mattis pellentesque id nibh tortor id aliquet. Adipiscing elit pellentesque habitant morbi tristique senectus.  In hac habitasse platea dictumst. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Nunc id cursus metus aliquam. Neque vitae tempus quam pellentesque. Vel pretium lectus quam id leo in. Egestas erat imperdiet sed euismod nisi porta lorem mollis. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Amet consectetur adipiscing elit pellentesque habitant. Cras ornare arcu dui vivamus arcu felis bibendum ut. Sem nulla pharetra diam sit amet nisl suscipit. Nulla pellentesque dignissim enim sit amet venenatis. Imperdiet massa tincidunt nunc pulvinar sapien et. A lacus vestibulum sed arcu non odio. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et.  Consectetur adipiscing elit duis tristique sollicitudin nibh. Suscipit tellus mauris a diam. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Sed velit dignissim sodales ut. Eu non diam phasellus vestibulum lorem. Eget dolor morbi non arcu. Enim nulla aliquet porttitor lacus. Porttitor eget dolor morbi non. Tincidunt arcu non sodales neque sodales ut. In eu mi bibendum neque. Augue mauris augue neque gravida in fermentum. Pharetra vel turpis nunc eget lorem. Nisl pretium fusce id velit ut tortor. Nisl tincidunt eget nullam non nisi est sit amet. Lectus magna fringilla urna porttitor rhoncus dolor. Tortor posuere ac ut consequat semper viverra. Diam ut venenatis tellus in metus vulputate eu scelerisque felis. Arcu non odio euismod lacinia at quis.  Volutpat sed cras ornare arcu dui vivamus. Tortor consequat id porta nibh venenatis. Pellentesque habitant morbi tristique senectus. Non consectetur a erat nam at. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Amet mattis vulputate enim nulla aliquet porttitor. Commodo viverra maecenas accumsan lacus. Elementum integer enim neque volutpat. Vitae nunc sed velit dignissim sodales ut eu sem. Vestibulum mattis ullamcorper velit sed. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Malesuada proin libero nunc consequat interdum varius sit. Turpis massa tincidunt dui ut ornare lectus sit amet est. Non pulvinar neque laoreet suspendisse interdum. Sed cras ornare arcu dui vivamus arcu. Neque laoreet suspendisse interdum consectetur libero id. Morbi tristique senectus et netus. Orci porta non pulvinar neque.  Et malesuada fames ac turpis egestas integer eget aliquet nibh. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Purus gravida quis blandit turpis cursus in hac habitasse. In massa tempor nec feugiat nisl pretium fusce id velit. Dolor magna eget est lorem. Nibh sed pulvinar proin gravida. Est velit egestas dui id ornare. Varius vel pharetra vel turpis nunc. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Sit amet risus nullam eget felis eget nunc. Et malesuada fames ac turpis egestas sed tempus urna. Sed libero enim sed faucibus turpis in eu mi bibendum. Eu facilisis sed odio morbi quis commodo odio aenean sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Risus viverra adipiscing at in tellus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Lacinia at quis risus sed vulputate odio ut. Amet nisl purus in mollis nunc sed. Vulputate enim nulla aliquet porttitor.  Amet risus nullam eget felis eget nunc lobortis. Tristique magna sit amet purus gravida quis. Duis ut diam quam nulla porttitor massa id neque aliquam. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Blandit libero volutpat sed cras. Interdum varius sit amet mattis vulputate enim nulla. Odio ut sem nulla pharetra diam. Quisque id diam vel quam elementum pulvinar etiam non. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Integer vitae justo eget magna. Aliquet risus feugiat in ante metus dictum at tempor commodo.  Tellus molestie nunc non blandit massa enim. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Sed vulputate odio ut enim. Faucibus in ornare quam viverra. Lobortis scelerisque fermentum dui faucibus. Auctor eu augue ut lectus arcu bibendum at varius vel. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Sagittis orci a scelerisque purus. Vel eros donec ac odio tempor orci dapibus ultrices. Est placerat in egestas erat imperdiet sed euismod nisi. A diam maecenas sed enim ut. Fames ac turpis egestas integer eget. Elementum nibh tellus molestie nunc non blandit massa enim. Consectetur adipiscing elit pellentesque habitant morbi tristique.  Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Ut eu sem integer vitae justo eget magna fermentum iaculis. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Hac habitasse platea dictumst quisque sagittis purus sit. Morbi tincidunt ornare massa eget egestas purus. Aliquam vestibulum morbi blandit cursus. Tincidunt dui ut ornare lectus sit amet est. Suscipit adipiscing bibendum est ultricies integer quis. Pretium fusce id velit ut tortor pretium viverra suspendisse. Dictum varius duis at consectetur. Viverra nam libero justo laoreet. Consequat id porta nibh venenatis cras sed.  Donec adipiscing tristique risus nec feugiat in. Et magnis dis parturient montes nascetur ridiculus mus. Ut venenatis tellus in metus. A diam maecenas sed enim ut sem viverra aliquet. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Elementum sagittis vitae et leo. Facilisi morbi tempus iaculis urna. Adipiscing bibendum est ultricies integer quis auctor elit. Nec nam aliquam sem et tortor consequat id. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Penatibus et magnis dis parturient montes nascetur. Semper eget duis at tellus at urna. Erat velit scelerisque in dictum non consectetur. Id consectetur purus ut faucibus pulvinar elementum integer. Eu volutpat odio facilisis mauris sit. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Justo nec ultrices dui sapien eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.  Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Nunc sed velit dignissim sodales ut. Nunc vel risus commodo viverra. Tortor vitae purus faucibus ornare suspendisse sed nisi. Convallis aenean et tortor at risus. Sed arcu non odio euismod. Diam ut venenatis tellus in. Aliquet nibh praesent tristique magna sit amet. Diam maecenas sed enim ut sem viverra aliquet eget. Senectus et netus et malesuada fames ac. Nisi quis eleifend quam adipiscing. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Bibendum ut tristique et egestas. Feugiat scelerisque varius morbi enim nunc faucibus. Cum sociis natoque penatibus et magnis dis. Dictumst quisque sagittis purus sit amet. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Dignissim enim sit amet venenatis.  Justo laoreet sit amet cursus. Ultrices vitae auctor eu augue. Volutpat ac tincidunt vitae semper quis lectus nulla. Hac habitasse platea dictumst vestibulum rhoncus est. Tortor posuere ac ut consequat semper viverra nam libero. Risus ultricies tristique nulla aliquet enim tortor. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Fermentum leo vel orci porta non pulvinar neque. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Scelerisque in dictum non consectetur. Eu turpis egestas pretium aenean pharetra magna. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Integer malesuada nunc vel risus commodo viverra maecenas. Ullamcorper eget nulla facilisi etiam dignissim diam quis. Feugiat in fermentum posuere urna nec tincidunt praesent semper.  Molestie ac feugiat sed lectus. Fringilla est ullamcorper eget nulla facilisi etiam dignissim. In fermentum et sollicitudin ac orci phasellus egestas tellus. Pulvinar mattis nunc sed blandit. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Semper quis lectus nulla at volutpat diam. A erat nam at lectus urna duis convallis convallis tellus. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Mollis nunc sed id semper risus in hendrerit gravida. Amet purus gravida quis blandit turpis cursus. At consectetur lorem donec massa sapien faucibus et molestie. Cum sociis natoque penatibus et magnis. Scelerisque eleifend donec pretium vulputate. Nam libero justo laoreet sit. Vitae suscipit tellus mauris a diam. Sapien faucibus et molestie ac feugiat. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius.  Dolor purus non enim praesent elementum facilisis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Facilisis mauris sit amet massa vitae. Non consectetur a erat nam at lectus. Facilisis gravida neque convallis a. Odio facilisis mauris sit amet. Pellentesque habitant morbi tristique senectus et netus. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Blandit turpis cursus in hac habitasse platea. Adipiscing tristique risus nec feugiat in fermentum posuere.  Vel eros donec ac odio tempor orci. Purus semper eget duis at tellus at. Vel quam elementum pulvinar etiam non quam lacus. Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Ipsum consequat nisl vel pretium lectus quam id leo. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Aliquet nibh praesent tristique magna sit amet. Volutpat blandit aliquam etiam erat velit scelerisque in. Non consectetur a erat nam at lectus urna duis convallis. Eu sem integer vitae justo eget magna fermentum iaculis. Diam maecenas sed enim ut. Eget duis at tellus at urna condimentum mattis pellentesque. Semper quis lectus nulla at volutpat. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. A pellentesque sit amet porttitor.  Aliquam ultrices sagittis orci a scelerisque purus semper. Blandit aliquam etiam erat velit. Commodo ullamcorper a lacus vestibulum sed. Nibh sit amet commodo nulla. Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Et netus et malesuada fames ac turpis egestas integer. At varius vel pharetra vel turpis nunc eget lorem. Cras pulvinar mattis nunc sed. Est lorem ipsum dolor sit. Enim nunc faucibus a pellentesque. Purus in massa tempor nec feugiat. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Aliquam ultrices sagittis orci a scelerisque purus. Augue interdum velit euismod in pellentesque massa. Mi eget mauris pharetra et. Nunc congue nisi vitae suscipit. Duis at tellus at urna condimentum mattis pellentesque id. Convallis posuere morbi leo urna molestie at elementum eu facilisis.  Tortor at risus viverra adipiscing at in tellus integer. Cursus vitae congue mauris rhoncus aenean. Nisl vel pretium lectus quam id leo. Nec feugiat in fermentum posuere. At tellus at urna condimentum mattis pellentesque id nibh tortor. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Mattis rhoncus urna neque viverra justo nec. Leo in vitae turpis massa sed. Dictum at tempor commodo ullamcorper. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Ac tortor vitae purus faucibus ornare suspendisse sed. Senectus et netus et malesuada fames ac turpis.",
      ],
      headerA: "TRUE: Generic schema header location 2",
      bodyB: ["TRUE: Generic schema body B"],
      listA: ["item a", "item b", "item c"],
    },
    false: {
      bodyA: ["FALSE: Generic schema body A"],
    },
  },
}

const genericSchemaB = {
  checkboxExample: {
    true: {
      headerA: "1. GB: checkbox is true. ",
      bodyA: ["2. GB: checkbox is true"],
    },
    false: {
      bodyA: ["3. GB: checkbox is false"],
    },
  },
}

// location specific schemas
const schemaLocationA = {
  radioExample: {
    option1: {
      bodyA: ["LA: Radio option 1"],
    },
    option2: {
      bodyA: ["LA: Radio option 2"],
    },
    option3: {
      headerA: "LA: Radio option 3 header",
      bodyA: ["LA: Radio option 3 body"],
      headerB: "LA: Radio option 3 header B",
      bodyB: ["LA: Radio option 3 body B"],
      bodyC: ["LA: Radio option 3 body C"],
    },
  },
}

const schemaLocationB = {
  radioExample: {
    option1: {
      bodyA: ["LB: Radio option 1"],
    },
    option2: {
      bodyA: ["LB: Radio option 2"],
    },
  },
}

// helper functions

// get generic schema
const getGenericSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return genericSchemaA
    case "location2":
      return genericSchemaB
    default:
      return genericSchemaA
  }
}

// get dynamic schema
const getLocationSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return schemaLocationA
    case "location2":
      return schemaLocationB
    default:
      return schemaLocationA
  }
}

// export from separate file
export const getSchemas = ({ selectedLocation }) => {
  // The schemas are specific to the location so need to be fetched dynamically
  const locationSchema = getLocationSchema({ selectedLocation })
  const genericSchema = getGenericSchema({ selectedLocation })

  return { locationSchema, genericSchema } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
}

// build doc template
// Need to fill the schema with correct formData values
// Create PDF styles
const testStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  body: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  section: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  paragraph: {
    marginBottom: 2,
  },
  listUnordered: {
    textIndent: 10,
  },
  listOrdered: {
    textIndent: 10,
  },
  sectionStart: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
})

const renderPDFComponent = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
}) => {
  const sectionNumber = sectionIndex + 1
  const contentNumber = contentIndex + 1

  switch (schemaSectionContent.type) {
    case "header":
      return (
        <Text
          style={testStyles.h1}
        >{`${sectionNumber}. ${schemaSectionContent.value}`}</Text>
      )
    case "subheader":
      return (
        <Text
          style={testStyles.h2}
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    case "body":
      return (
        <View style={testStyles.section}>
          {schemaSectionContent.value.map((item, index) => {
            return (
              <Text key={index} style={testStyles.paragraph}>
                {`${sectionNumber}.${contentIndex} ${item} `}
              </Text>
            )
          })}
        </View>
      )

    case "listUnordered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listUnordered}>
            - {item}
          </Text>
        )
      })
    case "listOrdered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listOrdered}>
            {index + 1}. {item}
          </Text>
        )
      })
    case "sectionStart":
      return (
        <Text
          {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
          style={testStyles.sectionStart}
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    default:
      return genericSchemaA
  }
}

export const fillDocTemplate = ({ docTemplate, selectedLocation }) => {
  // Render PDF according to docTemplate layout
  return docTemplate.map((schemaSection, sectionIndex) => {
    // get the location array inside each section
    const sectionValidLocations = schemaSection.location

    // See if at least one location matches
    const hasCorrectLocation = sectionValidLocations.some(
      (location: string) => {
        return location === "all" || location === selectedLocation
      }
    )
    // and only return section values that match the location
    if (hasCorrectLocation) {
      // CATCH ERRORS -----------------
      // Check if sectionValidLocations is defined since everything breaks if we don't have this info
      if (!sectionValidLocations) {
        throw new Error(
          `Jurisdiction isn't defined for section: ${JSON.stringify(
            sectionIndex
          )} at index: ${JSON.stringify(sectionIndex)}`
        )
      }

      // ------------------------------ MOVE TO schema content map function
      // Check if the value field exists in content since template is incorrect if this is missing
      // if (schemaSection.value === undefined) {
      //   //return <Text key={sectionIndex}>Nothing to see here</Text>
      //   throw new Error(
      //     `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
      //       schemaSection.sectionID
      //     )} at index: ${JSON.stringify(sectionIndex)}
      //    \n Troubleshooting: Review the following docTempate schema and also check that genericSchema and locationSchema are correct as they can lead to undefined values. => ${JSON.stringify(
      //      docTemplate,
      //      null,
      //      2
      //    )}.`
      //   )
      // }
      // End  ----------------

      return schemaSection.content.map((schemaSectionContent, contentIndex) => {
        return renderPDFComponent({
          schemaSectionContent: schemaSectionContent,
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
        })
      })
    } else {
      return null // to prevent rendering content for sections that don't match the location
    }
  })
}

// render final doc
const buildFinalDoc = ({ formData }) => {
  // get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // get schemas
  const { locationSchema, genericSchema } = getSchemas({
    selectedLocation: selectedLocation,
  })

  // set up doc template
  // NOTE: Be careful using "all" since it can break if the genericSchema changes
  const docTemplate = [
    {
      sectionID: "s1",
      location: ["all"], // can be "all" or a specific location
      content: [
        {
          location: ["all"],
          type: "header",
          value:
            genericSchema.checkboxExample.true.headerA || // can also have conditional logic values but this should be minimized to avoid confusing schemas
            genericSchemaB.checkboxExample.true.headerA,
        },
        {
          // Can include multiple groups by spreading them into the array
          location: [
            ...locationGroups.locationGroupA,
            ...locationGroups.locationGroupB,
          ],
          type: "body",
          value: genericSchema.checkboxExample.true.bodyA,
        },
      ],
    },
    {
      sectionID: "s2",
      location: [...locationGroups.locationGroupB],
      content: [
        {
          location: [...locationGroups.locationGroupB],
          type: "header",
          value: "Section 2 Header",
        },
        {
          location: [...locationGroups.locationGroupB],
          type: "body",
          value: locationSchema.radioExample.option2.bodyA,
        },
      ],
    },
    {
      sectionID: "s3",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Section 3 Header",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "listUnordered",
          value: genericSchema.checkboxExample.true.listA,
        },
      ],
    },
    {
      sectionID: "s4",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Section 4 Header",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "listOrdered",
          value: genericSchema.checkboxExample.true.listA,
        },
      ],
    },
    {
      sectionID: "s5",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Hardcoded sectionStart",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "sectionStart",
          value: "A New Section Starts Here",
        },
      ],
    },
  ]

  const generatedDoc = fillDocTemplate({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedDoc
}

export default buildFinalDoc

// OLD DOC TEMPLATE
// const docTemplate = [
//   {
//     sectionID: "s1",
//     location: ["all"],
//     type: "header",
//     value:
//       genericSchema.checkboxExample.true.headerA ||
//       genericSchemaB.checkboxExample.true.headerA,
//   },
//   {
//     sectionID: "s2",
//     location: [
//       ...locationGroups.locationGroupA,
//       ...locationGroups.locationGroupB,
//     ],
//     type: "body",
//     value: genericSchema.checkboxExample.true.bodyA,
//   },
//   {
//     sectionID: "s3",
//     location: [...locationGroups.locationGroupB],
//     type: "body",
//     value: locationSchema.radioExample.option2.bodyA,
//   },
//   {
//     sectionID: "s4",
//     location: [...locationGroups.locationGroupA],
//     type: "listUnordered",
//     value: genericSchema.checkboxExample.true.listA,
//   },
//   {
//     sectionID: "s5",
//     location: [...locationGroups.locationGroupA],
//     type: "listOrdered",
//     value: genericSchema.checkboxExample.true.listA,
//   },
//   {
//     sectionID: "s6",
//     location: [...locationGroups.locationGroupA],
//     type: "sectionStart",
//     value: "A New Section Starts Here",
//   },
// ]
