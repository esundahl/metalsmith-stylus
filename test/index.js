
var assertDir = require('assert-dir-equal')
var stylus = require('../')
var Metalsmith = require('metalsmith')

describe('metalsmith-stylus', function() {
  it('should convert stylus files to css', function(done){
    Metalsmith('test/fixtures/basic')
      .use(stylus())
      .build(function(err) {
        if (err) return done(err)
        assertDir('test/fixtures/basic/expected', 'test/fixtures/basic/build')
        return done(null)
      })
  })
})
