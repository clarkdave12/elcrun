<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elections', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique;
            $table->date('start_date');
            $table->date('end_date');
            $table->string('election_url');
            $table->string('short_url');
            $table->string('preview_url');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('election_status_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('elections');
    }
}
