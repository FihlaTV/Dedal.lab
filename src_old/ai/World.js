
DDLS.World = function( w, h ) {
    
    this.w = w || 512;
    this.h = h || 512;

    this.mesh = DDLS.RectMesh( this.w, this.h );

    this.pathFinder = new DDLS.PathFinder();
    this.pathFinder.mesh = this.mesh;

    this.heroes = [];
    this.shapes = [];
    this.segments = [];
    this.objects = [];

};

DDLS.World.prototype = {

    getMesh:function(){
        return this.mesh;
    },

    update:function(){

        var lng = this.heroes.length;

        var i = lng, j, h;

        while( i-- ){

            h = this.heroes[i];

            h.update();

            if(h.testSee){
                j = lng;
                while( j-- ){
                    if( i !== j ) {
                        this.heroes[i].entity.isSee = this.heroes[i].fov.isInField( this.heroes[j].entity );
                    }
                }
            }

        }

    },

    updateMesh : function(){

       this.mesh.updateObjects();

    },
    
    add : function ( o ) {

        this.mesh.insertObject(o);
        this.objects.push(o);

    },

    addHeroe : function( s ){

        var h = new DDLS.Heroe( s, this );
        this.heroes.push( h );
        return h;
        
    },

    addObject : function( s ){

        s = s || {};
        var o = new DDLS.Object();
        o.coordinates = s.coord || [-1,-1,1,-1,  1,-1,1,1,  1,1,-1,1,  -1,1,-1,-1];
        o.position(s.x || 1,s.y || 1);
        o.scale(s.w || 1, s.h || 1);
        o.pivot( s.px || 0, s.py || 0);
        o.rotation = s.r || 0;

        this.mesh.insertObject(o);
        this.objects.push(o);
        return o;
    },

    reset : function(w,h){

        this.mesh.dispose();
        if(w) this.w = w;
        if(h) this.h = h;
        this.mesh = DDLS.RectMesh( this.w, this.h );
        this.pathFinder.mesh = this.mesh;
    
    },

    rebuild : function( mesh ){

        this.mesh.clear( true );
        if( mesh !== undefined ) this.mesh = mesh;
        else this.mesh = DDLS.RectMesh( this.w, this.h );
        this.pathFinder.mesh = this.mesh;
        //this.mesh._objects = [];
        var i = this.objects.length;
        while(i--){
            this.objects[i]._constraintShape = null;
            this.mesh.insertObject(this.objects[i]);
        }
    },
    


};