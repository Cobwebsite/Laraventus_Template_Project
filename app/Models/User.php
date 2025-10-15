<?php

namespace App\Models;

use Aventus\Laraventus\Models\AventusModel;

/**
 * @property string $firstname
 * @property string $lastname
 */
class User extends AventusModel
{
    protected $fillable = [
        "firstname",
        "lastname"
    ];
}
