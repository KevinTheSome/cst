<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // rename singular table -> plural
        if (Schema::hasTable('form_code') && ! Schema::hasTable('form_codes')) {
            Schema::rename('form_code', 'form_codes');
        }

        Schema::table('form_codes', function (Blueprint $table) {
            // change expiration_date to datetime and nullable
            if (Schema::hasColumn('form_codes', 'expiration_date')) {
                // use ->dateTime instead of ->date. Use DB::statement for some DB drivers if needed.
                $table->dateTime('expiration_date')->nullable()->change();
            } else {
                $table->dateTime('expiration_date')->nullable();
            }

            // allow user_created to be nullable and make it unsignedBigInteger (optional FK)
            if (Schema::hasColumn('form_codes', 'user_created')) {
                $table->unsignedBigInteger('user_created')->nullable()->change();
            } else {
                $table->unsignedBigInteger('user_created')->nullable();
            }

            // If you want user_created to be a foreign key to users.id, uncomment below.
            // Make sure users table exists before adding FK.
            // $table->foreign('user_created')->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        // optional: reverse changes carefully
        Schema::table('form_codes', function (Blueprint $table) {
            if (Schema::hasColumn('form_codes', 'user_created')) {
                $table->integer('user_created')->change();
            }
            if (Schema::hasColumn('form_codes', 'expiration_date')) {
                $table->date('expiration_date')->nullable()->change();
            }
        });

        if (Schema::hasTable('form_codes') && ! Schema::hasTable('form_code')) {
            Schema::rename('form_codes', 'form_code');
        }
    }
};
